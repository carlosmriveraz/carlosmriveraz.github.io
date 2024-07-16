document.addEventListener("DOMContentLoaded", () => {
	loadCSVData();
	fetchApiValue(); // Llama a la función para obtener el valor desde la API
});

function fetchApiValue() {
	// Reemplaza con tu propia API key
	const apiUrl = `https://v6.exchangerate-api.com/v6/cfd2eebb13ae7c9ab9898b21/latest/USD`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			const rate = data.conversion_rates.COP;
			document.getElementById("api-value").textContent = rate.toFixed(2);
		})
		.catch((error) => {
			console.error("Error fetching API value:", error);
			document.getElementById("api-value").textContent = "Error";
		});
}

function loadCSVData() {
	const csvFilePath = "valordolarhistorico.csv";
	fetch(csvFilePath)
		.then((response) => response.text())
		.then((csvText) => {
			const data = parseCSV(csvText);
			if (data.length > 0) {
				displayTable(data);
				displayKPI(data);
				generatePredictions(data);
			} else {
				alert(
					"No se pudo cargar el archivo CSV. Se generarán datos aleatorios."
				);
				const randomData = generateRandomData(100);
				displayTable(randomData);
				displayKPI(randomData);
				generatePredictions(randomData);
			}
		})
		.catch((error) => {
			alert(
				"No se pudo cargar el archivo CSV. Se generarán datos aleatorios."
			);
			const randomData = generateRandomData(100);
			displayTable(randomData);
			displayKPI(randomData);
			generatePredictions(randomData);
		});
}

function parseCSV(csvText) {
	const lines = csvText.trim().split("\n");
	const data = lines.slice(1).map((line) => {
		const [Fecha, Precio] = line.split(",");
		return {
			Fecha,
			Precio: parseFloat(Precio),
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
		const randomValue = (3000 + Math.random() * 1000).toFixed(2);
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
		if (index >= 30) {
			tr.classList.add("hidden");
		}
		tbody.appendChild(tr);
	});

	const moreButton = document.createElement("button");
	moreButton.textContent = "Mostrar más";
	moreButton.addEventListener("click", () => {
		const hiddenRows = table.querySelectorAll("tr.hidden");
		hiddenRows.forEach((row, index) => {
			if (index < 30) {
				row.classList.remove("hidden");
			}
		});
		if (hiddenRows.length <= 30) {
			moreButton.style.display = "none";
		}
	});

	table.parentElement.appendChild(moreButton);

	new Sortable(table, {
		animation: 150,
		handle: "th",
		dataIdAttr: "data-id",
	});
}

function displayKPI(data) {
	const minValue = Math.min(...data.map((row) => row.Precio));
	const maxValue = Math.max(...data.map((row) => row.Precio));
	const avgValue = (
		data.reduce((sum, row) => sum + row.Precio, 0) / data.length
	).toFixed(2);

	document.getElementById("min-value").textContent = minValue;
	document.getElementById("max-value").textContent = maxValue;
	document.getElementById("avg-value").textContent = avgValue;
}

function generateStatistics() {
	const months = parseInt(document.getElementById("months").value);
	const data = getCurrentTableData();
	const recentData = data.slice(-months * 30); // Approximate last N months data

	const monthlyData = {};
	recentData.forEach((row) => {
		const month = row.Fecha.substring(0, 7); // YYYY-MM
		if (!monthlyData[month]) {
			monthlyData[month] = [];
		}
		monthlyData[month].push(row.Precio);
	});

	const labels = Object.keys(monthlyData);
	const averages = labels.map((month) => {
		const values = monthlyData[month];
		return (
			values.reduce((sum, value) => sum + value, 0) / values.length
		).toFixed(2);
	});

	renderBarChart(labels, averages);
	renderPieChart(labels, averages);
}

function renderBarChart(labels, data) {
	const ctx = document.getElementById("barChart").getContext("2d");
	new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Promedio Mensual del Dólar (COP)",
					data: data,
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
}

function renderPieChart(labels, data) {
	const ctx = document.getElementById("pieChart").getContext("2d");
	new Chart(ctx, {
		type: "pie",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Promedio Mensual del Dólar (COP)",
					data: data,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		},
	});
}

function getCurrentTableData() {
	const rows = document.querySelectorAll("#dollar-values tbody tr");
	return Array.from(rows).map((row) => {
		const cells = row.querySelectorAll("td");
		return {
			Fecha: cells[0].textContent,
			Precio: parseFloat(cells[1].textContent),
		};
	});
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
			Math.random() * 50 -
			25
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

	new Sortable(table, {
		animation: 150,
		handle: "th",
		dataIdAttr: "data-id",
	});
}
