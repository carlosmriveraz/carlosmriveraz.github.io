// Crea un nuevo objeto de audio
const miSonido = new Audio("../../../assets/music/dbz.wav");

// Selecciona el elemento que activará el sonido
document.querySelector(".sonido-hover").addEventListener("mouseover", () => {
  miSonido.play();
});
