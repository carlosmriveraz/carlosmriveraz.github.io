function generateCharts(dollarData) {
  // Gráfico 1: Valores históricos del dólar
  const ctx1 = document.getElementById("chart1").getContext("2d");
  const labels1 = dollarData.map((data) => data.Fecha).reverse();
  const values1 = dollarData.map((data) => data.Precio).reverse();

  new Chart(ctx1, {
    type: "line",
    data: {
      labels: labels1,
      datasets: [
        {
          label: "Valor del Dólar",
          data: values1,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false,
        },
      },
    },
  });

  // Gráfico 2: Promedio mensual
  const ctx2 = document.getElementById("chart2").getContext("2d");
  const monthlyData = {};

  dollarData.forEach((data) => {
    const month = data.Fecha.slice(0, 5); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = [];
    }
    monthlyData[month].push(data.Precio);
  });

  const labels2 = Object.keys(monthlyData).reverse();
  const values2 = labels2.map((month) => {
    const sum = monthlyData[month].reduce((a, b) => a + b, 0);
    return (sum / monthlyData[month].length).toFixed(2);
  });

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: labels2,
      datasets: [
        {
          label: "Promedio Mensual",
          data: values2,
          backgroundColor: "rgba(0,255, 255, 0.9)",
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Gráfico 3: Valores máximos y mínimos por mes
  const ctx3 = document.getElementById("chart3").getContext("2d");
  const maxValues = labels2.map((month) => Math.max(...monthlyData[month]));
  const minValues = labels2.map((month) => Math.min(...monthlyData[month]));

  new Chart(ctx3, {
    type: "line",
    data: {
      labels: labels2,
      datasets: [
        {
          label: "Valor Máximo",
          data: maxValues,
          borderColor: "#0ff",
          fill: false,
        },
        {
          label: "#f00",
          data: minValues,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
