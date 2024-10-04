// Crea un nuevo objeto de audio
const miSonido = new Audio("../../assets/music/juego.mp3");

// Selecciona el elemento que activará el sonido
document.querySelector(".sonido__hover").addEventListener("mouseover", () => {
  miSonido.play();
});
