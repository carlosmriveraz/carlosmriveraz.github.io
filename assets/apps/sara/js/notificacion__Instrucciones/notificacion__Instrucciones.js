// Mostrar modal al cargar la página
window.onload = function () {
  document.getElementById("modal-instrucciones").style.display = "block";
};

// Función para cerrar un modal
function cerrarModal() {
  document.getElementById("modal-instrucciones").style.display = "none";
}
