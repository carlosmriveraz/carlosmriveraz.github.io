// Cargar sonidos
const sonidoFondo = new Audio("./assets/music/fondo.mp3"); // Sonido constante
const sonidoJuego = new Audio("./assets/music/juego.mp3"); // Sonido al iniciar el juego
const sonidoError = new Audio("./assets/music/risa.mp3"); // Sonido cuando el jugador se equivoca
const sonidoSara = new Audio("./assets/music/sara.mp3"); // Sonido cuando se acierta con Sara
const sonidoGanar = new Audio("./assets/music/ganar.mp3"); // Sonido al ganar
const sonidoPerder = new Audio("./assets/music/perder.mp3"); // Sonido al perder

// Configurar el volumen
sonidoFondo.volume = 0.2; // Volumen al 20%

// Función para reproducir el sonido de fondo con descanso de 3 segundos
export function reproducirSonidoFondo() {
  sonidoFondo.loop = false; // Quitamos el bucle automático
  sonidoFondo.play();

  // Cuando termine el sonido, esperamos 3 segundos y volvemos a reproducir
  sonidoFondo.onended = function () {
    setTimeout(() => {
      sonidoFondo.play();
    }, 3000); // Espera 3 segundos antes de reproducir nuevamente
  };
}

// Función para reproducir el sonido de inicio del juego
export function reproducirSonidoJuego() {
  sonidoJuego.play();
}

// Función para reproducir el sonido de error (cuando no es "Sara")
// Lo detenemos automáticamente a los 3 segundos
export function reproducirSonidoError() {
  sonidoError.play();

  // Detener el sonido después de 3 segundos
  setTimeout(() => {
    sonidoError.pause();
    sonidoError.currentTime = 0; // Reinicia el sonido
  }, 3000);
}

// Función para reproducir el sonido de acierto (cuando es "Sara")
export function reproducirSonidoSara() {
  sonidoSara.play();
}

// Función para reproducir el sonido de ganar
export function reproducirSonidoGanar() {
  sonidoGanar.play();
}

// Función para reproducir el sonido de perder
// Lo detenemos automáticamente a los 3 segundos
export function reproducirSonidoPerder() {
  sonidoPerder.play();

  // Detener el sonido después de 3 segundos
  setTimeout(() => {
    sonidoPerder.pause();
    sonidoPerder.currentTime = 0; // Reinicia el sonido
  }, 3000);
}

// Función para detener todos los sonidos (debe estar disponible para ser importada)
export function detenerTodosLosSonidos() {
  sonidoFondo.pause();
  sonidoFondo.currentTime = 0;
  sonidoJuego.pause();
  sonidoJuego.currentTime = 0;
  sonidoError.pause();
  sonidoError.currentTime = 0;
  sonidoSara.pause();
  sonidoSara.currentTime = 0;
  sonidoGanar.pause();
  sonidoGanar.currentTime = 0;
  sonidoPerder.pause();
  sonidoPerder.currentTime = 0;
}
