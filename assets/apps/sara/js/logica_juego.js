// Importar la función de ventanas emergentes y los sonidos
import { mostrarVentanaEmergente } from "./notificaciones__Cambio_texto/ventanasEmergentes.js";
import {
  reproducirSonidoFondo,
  reproducirSonidoJuego,
  reproducirSonidoError,
  reproducirSonidoSara,
  reproducirSonidoGanar,
  reproducirSonidoPerder,
  detenerTodosLosSonidos,
} from "./sonido/sonido.js";

import { reiniciarJuego } from "./reinicio/reiniciar.js";

// Variables globales para el temporizador y los clics
let timer;

// Definir la función para iniciar el juego
export function iniciarJuego() {
  // Reproducir el sonido de fondo al iniciar el juego
  reproducirSonidoFondo();
  reproducirSonidoJuego();
  timer = null;
  // Obtener todos los elementos de texto
  const texts = document.querySelectorAll(".texto");
  let capturedCount = 0;
  let divsRestantes = texts.length;
  let tiempoRestante = 120; // Tiempo en segundos (2 minutos)

  // Actualizar marcadores
  document.getElementById("divs-restantes").innerText = divsRestantes;

  // Función para buscar el div que contiene "Sara"
  function findSara() {
    return Array.from(texts).find((text) => text.innerText === "Sara");
  }

  // Función para mover "Sara" a un nuevo div aleatorio
  function moveSara() {
    const saraDiv = findSara(); // Buscar el div actual que contiene "Sara"

    // Ocultar el div actual y quitar el texto
    saraDiv.style.display = "none";
    saraDiv.innerText = "";

    capturedCount++;
    divsRestantes--;

    // Reproducir el sonido de acierto (cuando el jugador acierta con "Sara")
    reproducirSonidoSara();

    // Actualizar marcadores
    document.getElementById("divs-capturados").innerText = capturedCount;
    document.getElementById("divs-restantes").innerText = divsRestantes;

    // Verificar si se ganó el juego
    if (divsRestantes === 0) {
      clearInterval(timer); // Detener el temporizador
      reproducirSonidoGanar(); // Sonido de ganar
      mostrarVentanaEmergente(
        "¡Felicidades! Ganaste",
        "Has capturado todas las Saras.",
        "./imagenes/sara2.jpg"
      ); // Mostrar ventana emergente de ganaste
      detenerTodosLosSonidos();
      return;
    }

    // Generar un nuevo índice aleatorio que sea diferente del actual
    let newSaraDiv;
    do {
      const randomIndex = Math.floor(Math.random() * texts.length);
      newSaraDiv = texts[randomIndex];
    } while (newSaraDiv.style.display === "none"); // No mover a un div que ya haya sido ocultado

    // Asignar el texto "Sara" al nuevo div
    newSaraDiv.innerText = "Sara";
  }

  // Función para manejar el clic en el texto
  function handleClick(event) {
    const clickedDiv = event.target;

    // Solo permitir que se haga clic en el div con "Sara"
    if (clickedDiv.innerText === "Sara") {
      moveSara(); // Mover "Sara" a otro div aleatorio
    } else {
      alert("¡Debes tocar el texto 'Sara' para continuar!");
      reproducirSonidoError(); // Sonido de error al equivocarse
    }
  }

  // Temporizador
  function startTimer() {
    timer = setInterval(() => {
      tiempoRestante--;
      let minutes = Math.floor(tiempoRestante / 60);
      let seconds = tiempoRestante % 60;

      // Formatear segundos con 2 dígitos
      seconds = seconds < 10 ? "0" + seconds : seconds;
      document.getElementById("tiempo-restante").innerText =
        minutes + ":" + seconds;

      // Si el tiempo se acaba
      if (tiempoRestante <= 0) {
        clearInterval(timer);
        reproducirSonidoPerder(); // Sonido de perder
        mostrarVentanaEmergente(
          "¡Tiempo agotado!",
          "No lograste capturar todas las Saras.",
          "./imagenes/fresa_perdio.png"
        ); // Mostrar ventana emergente de perdiste
        detenerTodosLosSonidos();
        // Deshabilitar clics en los divs
        texts.forEach((text) => {
          text.removeEventListener("click", handleClick);
        });
      }
    }, 1000);
  }

  // Añadir el evento de clic solo a los divs que contienen "Sara"
  texts.forEach((text) => {
    text.addEventListener("click", handleClick);
  });

  // Iniciar el temporizador
  startTimer();
}

// Mostrar el modal de instrucciones al cargar la página
window.onload = function () {
  document.getElementById("modal__instrucciones").style.display = "block";

  // Conectar botones de reiniciar y detener a sus respectivas funciones
  document
    .getElementById("boton__reiniciar")
    .addEventListener("click", reiniciarJuego);
};

// Función para cerrar el modal y comenzar el juego
function cerrarModal() {
  document.getElementById("modal__instrucciones").style.display = "none";
  iniciarJuego(); // Llamar la función para iniciar el juego
}

// Agregar el evento de clic para el botón "Comenzar"
document
  .getElementById("boton__comenzar")
  .addEventListener("click", cerrarModal);
