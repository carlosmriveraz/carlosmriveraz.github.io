/************ GET YEAR */

// Función para mostrar el año actual
export function updateYear() {
	const yearEl = document.querySelector(".year");
	yearEl.innerHTML = new Date().getFullYear();
}
