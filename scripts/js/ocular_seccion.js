// Función para manejar el desplazamiento suave al hacer clic en los enlaces de anclaje
export function desplazamientoSuave() {
	document.querySelectorAll('a[href^="#"]').forEach((ancla) => {
		ancla.addEventListener("click", function (evento) {
			evento.preventDefault();

			const objetivo = document.querySelector(this.getAttribute("href"));
			objetivo.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});
}
