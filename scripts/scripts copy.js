// Función para alternar el tema
// Función para alternar el tema
function toggleTheme(event) {
  // Verifica si el evento de teclado es Enter o Espacio
  if (
    event &&
    event.type === "keydown" &&
    event.key !== "Enter" &&
    event.key !== " "
  ) {
    return;
  }

  // Alterna entre las clases de tema
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  // Guarda la preferencia del usuario en localStorage
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Detecta y aplica el tema preferido del sistema operativo del usuario
function applyPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme + "-theme");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.add(prefersDark ? "dark-theme" : "light-theme");
  }
}

// Aplica el tema cuando se carga la página
applyPreferredTheme();