// Cargar sonidos
const sonidoFondo = new Audio("./assets/music/fondo.mp3"); // Sonido constante
const sonidoJuego = new Audio("./assets/music/juego.mp3"); // Sonido al iniciar el juego
const sonidoError = new Audio("./assets/music/risa.mp3"); // Sonido cuando el jugador se equivoca
const sonidoSara = new Audio("./assets/music/sara.mp3"); // Sonido cuando se acierta con Sara
const sonidoGanar = new Audio("./assets/music/ganar.mp3"); // Sonido al ganar
const sonidoPerder = new Audio("./assets/music/perder.mp3"); // Sonido al perder

// Configurar el volumen
sonidoFondo.volume = 0.2; // Volumen al 50%

// Función para reproducir el sonido de fondo en bucle
export function reproducirSonidoFondo() {
  sonidoFondo.loop = true;
  sonidoFondo.play();
}

// Función para reproducir el sonido de inicio del juego
export function reproducirSonidoJuego() {
  sonidoJuego.play();
}

// Función para reproducir el sonido de error (cuando no es "Sara")
export function reproducirSonidoError() {
  sonidoError.play();
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
export function reproducirSonidoPerder() {
  sonidoPerder.play();
}
