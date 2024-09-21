document.addEventListener("DOMContentLoaded", () => {
  loadCSVData();
  fetchApiValue(); // Descomentarlo si se necesita en el futuro
});

function loadCSVData() {
  const csvFilePath = "valordolarhistorico.csv";

  fetch(csvFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo leer el archivo CSV.");
      }
      return response.text();
    })
    .then((csvText) => {
      const data = parseCSV(csvText);
      if (data.length > 0) {
        displayTable(data);
        displayKPI(data);
        generatePredictions(data);
        generateMonthlyStatistics(data);
      } else {
        handleLoadError();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      handleLoadError();
    });
}

function handleLoadError() {
  alert("No se pudo cargar el archivo CSV. Se generarán datos aleatorios.");
  const randomData = generateRandomData(100);
  displayTable(randomData);
  displayKPI(randomData);
  generatePredictions(randomData);
  generateMonthlyStatistics(randomData);
}

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const data = lines.slice(1).map((line) => {
    const [Fecha, Precio] = line.split(",");
    return {
      Fecha: Fecha.trim(),
      Precio: parseFloat(Precio.trim()),
    };
  });
  return data;
}

function generateRandomData(days) {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];
    const randomValue = (3800 + Math.random() * 500).toFixed(2);
    data.push({
      Fecha: formattedDate,
      Precio: parseFloat(randomValue),
    });
  }
  return data;
}

function displayTable(data) {
  const table = document.getElementById("dollar-values");
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.Fecha}</td><td>${row.Precio}</td>`;

    tbody.appendChild(tr);
  });

  const moreButton = document.createElement("button");
  moreButton.textContent = "Mostrar más";
  moreButton.addEventListener("click", () => {
    const hiddenRows = table.querySelectorAll("tr.hidden");
    hiddenRows.forEach((row, index) => {
      if (index < 10) {
        row.classList.remove("hidden");
      }
    });
    if (hiddenRows.length <= 10) {
      moreButton.style.display = "none";
    }
  });
}

function displayKPI(data) {
  const minValue = Math.min(...data.map((row) => row.Precio));
  const maxValue = Math.max(...data.map((row) => row.Precio));
  const avgValue = (
    data.reduce((sum, row) => sum + row.Precio, 0) / data.length
  ).toFixed(2);

  document.getElementById("valor-minimo").textContent = minValue;
  document.getElementById("valor-maximo").textContent = maxValue;
  document.getElementById("avg-value").textContent = avgValue;
}

function generatePredictions(data) {
  const predictions = [];
  const lastDate = new Date(data[data.length - 1].Fecha);
  for (let i = 1; i <= 2; i++) {
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + i);
    const formattedDate = nextDate.toISOString().split("T")[0];
    const randomPrediction = (
      data[data.length - 1].Precio +
      Math.random() * 5 -
      5
    ).toFixed(2);
    predictions.push({
      Fecha: formattedDate,
      Precio: parseFloat(randomPrediction),
    });
  }

  const table = document.getElementById("predictions");
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";

  predictions.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.Fecha}</td><td>${row.Precio}</td>`;
    tbody.appendChild(tr);
  });
}

function generateMonthlyStatistics(data) {
  const monthlyData = {};

  data.forEach((row) => {
    const month = row.Fecha.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = [];
    }
    monthlyData[month].push(row.Precio);
  });

  const stats = Object.keys(monthlyData).map((month) => {
    const values = monthlyData[month];
    const average = (
      values.reduce((sum, value) => sum + value, 0) / values.length
    ).toFixed(2);
    const min = Math.min(...values).toFixed(2);
    const max = Math.max(...values).toFixed(2);
    return { month, average, min, max };
  });

  displayMonthlyTable(stats);
}

function displayMonthlyTable(stats) {
  const table = document.getElementById("monthly-statistics");
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";

  stats.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.month}</td><td>${row.average}</td><td>${row.max}</td><td>${row.min}</td>`;
    tbody.appendChild(tr);
  });
}
