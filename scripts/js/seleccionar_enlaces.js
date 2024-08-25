// linkHandler.js

// Seleccionar todos los enlaces
const allLinks = document.querySelectorAll("a:link");

// Manejar el clic en los enlaces
export function seleccionar_enlaces() {
	allLinks.forEach(function (link) {
		link.addEventListener("click", function (e) {
			const href = link.getAttribute("href");

			// Prevenir el comportamiento predeterminado para ciertos enlaces
			if (!href.startsWith("mailto:") && !href.startsWith("https")) e.preventDefault();

			// Scroll back to top
			if (href === "#") window.scrollTo({top: 0, behavior: "smooth"});

			// Scroll to other page or section
			if (href !== "#" && href.startsWith("#")) {
				const sectionEl = document.querySelector(href);
				sectionEl.scrollIntoView({behavior: "smooth"});
			}

			// Toggle menu if needed
			const headerEl = document.querySelector("header"); // Asegúrate de que el selector sea correcto
			if (header && headerEl.classList.contains("show-menu")) {
				headerEl.classList.toggle("show-menu");
			}
		});
	});
}
