document.addEventListener("DOMContentLoaded", () => {
	// Crea un nuevo objeto de audio
	const miSonido = new Audio("../assets/music/dba.wav");

	// Ajusta el volumen si es necesario
	miSonido.volume = 1; // Máximo volumen

	// Selecciona el elemento que activará el sonido
	document.querySelector(".sonido__hover").addEventListener("mouseover", () => {
		miSonido.play().catch((error) => {
			console.error("Error al reproducir el sonido:", error);
		});
	});
});
