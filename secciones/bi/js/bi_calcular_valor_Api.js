document.addEventListener("DOMContentLoaded", function () {
  obtenerValorAPI();
});

// Función para obtener el valor del dólar de una fuente oficial
function obtenerValorAPI() {
  fetch("https://api.exchangerate-api.com/v4/latest/USD") // Ejemplo de API
    .then((response) => response.json())
    .then((data) => {
      const valorCOP = data.rates.COP; // Ejemplo para obtener valor en COP
      document.getElementById("valor-api").textContent = valorCOP.toFixed(2);
      document.getElementById("api-fuente").textContent = "Exchangerate API"; // Fuente oficial
    })
    .catch((error) =>
      console.error("Error al obtener el valor de la API:", error)
    );
}
