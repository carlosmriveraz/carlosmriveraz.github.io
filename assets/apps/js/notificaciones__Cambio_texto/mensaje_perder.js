// textos.js
export function generarTextoAleatorio(tipo) {
	const titulosGanar = ["¡Felicidades!", "¡Has Ganado!", "¡Victoria!"];
	const titulosPerder = ["Lo siento", "Has Perdido", "Inténtalo de nuevo"];
	const descripciones = [
		"Has jugado muy bien, ¡continúa así!",
		"Fue una partida increíble, sigue practicando.",
		"Puedes mejorar aún más, ¡sigue adelante!",
	];

	if (tipo === "ganar") {
		return titulosGanar[Math.floor(Math.random() * titulosGanar.length)];
	} else if (tipo === "perder") {
		return titulosPerder[Math.floor(Math.random() * titulosPerder.length)];
	} else if (tipo === "descripcion") {
		return descripciones[Math.floor(Math.random() * descripciones.length)];
	}
}
