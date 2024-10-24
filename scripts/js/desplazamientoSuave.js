// Función para manejar el desplazamiento suave al hacer clic en los enlaces de anclaje
export function desplazamientoSuave() {
  // Selecciona todos los enlaces que comienzan con #
  const enlacesAncla = document.querySelectorAll('a[href^="#"]');

  // Recorre cada enlace
  enlacesAncla.forEach((ancla) => {
    // Añade un evento de clic al enlace
    ancla.addEventListener("click", function (evento) {
      // Previene el comportamiento por defecto del enlace
      evento.preventDefault();

      // Obtiene el objetivo de desplazamiento usando el atributo href del enlace
      const objetivo = document.querySelector(this.getAttribute("href"));

      // Realiza el desplazamiento suave hacia el objetivo
      objetivo.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave
        block: "start", // Alinea el objetivo en la parte superior del viewport
      });
    });
  });
}
