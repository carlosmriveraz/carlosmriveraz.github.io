export function mostrarMensajePerder() {
  const modal = document.getElementById("modal-perder");
  modal.style.display = "flex"; // Mostrar el modal de perder
}

export function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}
