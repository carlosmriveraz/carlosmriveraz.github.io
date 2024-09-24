document.addEventListener("DOMContentLoaded", function () {
  cargarDatosYGenerarGraficos();
});

// Función para cargar datos y generar gráficos
function cargarDatosYGenerarGraficos() {
  const datosDolar = cargarDatosDolar(); // Simulación de datos cargados
  generarGrafico1(datosDolar); // Generar gráfico 1 (valores históricos)
  generarGrafico2(datosDolar); // Generar gráfico 2 (últimos 10 días)
  generarGrafico3(datosDolar); // Generar gráfico 3 (máximos y mínimos)
}

// Función para cargar los datos simulados
function cargarDatosDolar() {
  const datos = [];
  const fechaInicial = new Date();
  fechaInicial.setDate(fechaInicial.getDate() - 100);

  for (let i = 0; i < 100; i++) {
    const fecha = new Date(fechaInicial);
    fecha.setDate(fechaInicial.getDate() + i);
    const valorAleatorio = (3800 + Math.random() * 500).toFixed(2);
    datos.push({
      fecha: fecha.toISOString().split("T")[0],
      valor: parseFloat(valorAleatorio),
    });
  }

  return datos;
}

// Función para generar el gráfico 1 (Valores Históricos del Dólar)
function generarGrafico1(datos) {
  const ctx1 = document.getElementById("chart1").getContext("2d");
  const etiquetas = datos.map((dato) => dato.fecha);
  const valores = datos.map((dato) => dato.valor);

  new Chart(ctx1, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: "Valor del Dólar",
          data: valores,
          borderColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-paleta3"),
          backgroundColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-paleta3"),
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Función para generar el gráfico 2 (Últimos 10 Días)
function generarGrafico2(datos) {
  const ctx2 = document.getElementById("chart2").getContext("2d");
  const ultimos10Dias = datos.slice(-10);
  const etiquetas = ultimos10Dias.map((dato) => dato.fecha);
  const valores = ultimos10Dias.map((dato) => dato.valor);

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: "Últimos 10 Días",
          data: valores,
          backgroundColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-paleta5"),
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Función para generar el gráfico 3 (Máximos y Mínimos por Mes)
function generarGrafico3(datos) {
  const ctx3 = document.getElementById("chart3").getContext("2d");
  const datosPorMes = {};

  datos.forEach((dato) => {
    const mes = dato.fecha.slice(0, 7); // YYYY-MM
    if (!datosPorMes[mes]) datosPorMes[mes] = [];
    datosPorMes[mes].push(dato.valor);
  });

  const etiquetas = Object.keys(datosPorMes);
  const maximos = etiquetas.map((mes) => Math.max(...datosPorMes[mes]));
  const minimos = etiquetas.map((mes) => Math.min(...datosPorMes[mes]));

  new Chart(ctx3, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: "Valor Máximo",
          data: maximos,
          borderColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-paleta1"),
          fill: false,
        },
        {
          label: "Valor Mínimo",
          data: minimos,
          borderColor: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--color-paleta2"),
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}
