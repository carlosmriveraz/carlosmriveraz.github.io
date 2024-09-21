export function resaltarEnlaceActivo() {
  const secciones = document.querySelectorAll("section");
  const enlacesNav = document.querySelectorAll(
    ".navbar__menu-list .navbar__link"
  );

  window.addEventListener("scroll", () => {
    let actual = "";

    secciones.forEach((seccion) => {
      const topSeccion = seccion.offsetTop;
      if (scrollY >= topSeccion - 60) {
        actual = seccion.getAttribute("id");
      }
    });

    enlacesNav.forEach((enlace) => {
      enlace.classList.remove("active");
      if (enlace.getAttribute("href").includes(actual)) {
        enlace.classList.add("active");
      }
    });
  });
}

// Función para manejar el desplazamiento suave al hacer clic en los enlaces de anclaje
export function desplazamientoSuave() {
  document.querySelectorAll('a[href^="#"]').forEach((ancla) => {
    ancla.addEventListener("click", function (evento) {
      evento.preventDefault();

      const objetivo = document.querySelector(this.getAttribute("href"));
      objetivo.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

// Función para manejar el menú de hamburguesa

// Función para alternar el tema claro y oscuro
export function alternarTema() {
  const botonTema = document.querySelector(".theme-toggle");

  botonTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
