// Eliminar la clase 'activo' de todos los enlaces
const enlaces = document.querySelectorAll(".enlace");
enlaces.forEach((enlace) => {
  enlace.classList.remove("activo");
});

// Añadir la clase 'activo' al enlace clicado
elemento.classList.add("activo");
