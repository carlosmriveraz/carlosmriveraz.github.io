// Obtener todos los elementos de texto
const texts = document.querySelectorAll(".texto");
let capturedCount = 0;
let divsRestantes = texts.length;
let timer;
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

  // Actualizar marcadores
  document.getElementById("divs-capturados").innerText = capturedCount;
  document.getElementById("divs-restantes").innerText = divsRestantes;

  // Verificar si se ganó el juego
  if (divsRestantes === 0) {
    clearInterval(timer); // Detener el temporizador
    document.getElementById("message").innerText =
      "¡Felicidades! Has Ganado. Tio Mario te ama. :)";
    return;
  }

  // Generar un nuevo índice aleatorio que sea diferente del actual
  let newSaraDiv;
  do {
    const randomIndex = Math.floor(Math.random() * texts.length);
    newSaraDiv = texts[randomIndex];
  } while (
    newSaraDiv.style.display === "none" // No mover a un div que ya haya sido ocultado
  );

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
      document.getElementById("message").innerText =
        "¡Tiempo agotado! Has perdido.";
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
