import { detenerTodosLosSonidos } from "../sonido/sonido.js"; // Ruta correcta

export function detenerJuego() {
  if (window.timer) {
    clearInterval(window.timer); // Detener el temporizador
  }
  detenerTodosLosSonidos(); // Detener sonidos

  // Deshabilitar los clics en los divs
  const texts = document.querySelectorAll(".texto");
  texts.forEach((text) => {
    text.removeEventListener("click", handleClick); // Asegúrate de que `handleClick` es accesible
  });

  alert("Juego detenido.");
}
