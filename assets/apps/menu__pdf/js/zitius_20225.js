function filtrar(categoria) {
	const bebidas = document.querySelectorAll(".bebida");
	bebidas.forEach((bebida) => {
		const categorias = bebida.parentElement.dataset.categoria;
		if (categoria === "todos" || categorias.includes(categoria)) {
			bebida.style.display = "block";
		} else {
			bebida.style.display = "none";
		}
	});
}

document.querySelector(".search-bar button").addEventListener("click", () => {
	const searchTerm = document
		.querySelector(".search-bar input")
		.value.toLowerCase();

	// Solo buscar si hay al menos 2 caracteres
	if (searchTerm.length > 1) {
		const bebidas = document.querySelectorAll(".bebida");
		const categorias = document.querySelectorAll(".categoria");

		bebidas.forEach((bebida) => {
			const nombre = bebida.querySelector("h3").textContent.toLowerCase();
			const descripcion = bebida.querySelector("p").textContent.toLowerCase();
			if (nombre.includes(searchTerm) || descripcion.includes(searchTerm)) {
				bebida.style.display = "block";
			} else {
				bebida.style.display = "none";
			}
		});

		// Ocultar categorías sin bebidas visibles
		categorias.forEach((categoria) => {
			const bebidasVisibles = categoria.querySelectorAll(
				".bebida[style*='block']"
			);
			if (bebidasVisibles.length > 0) {
				categoria.style.display = "block";
			} else {
				categoria.style.display = "none";
			}
		});
	} else {
		// Mostrar todo si hay menos de 2 caracteres
		const bebidas = document.querySelectorAll(".bebida");
		const categorias = document.querySelectorAll(".categoria");

		bebidas.forEach((bebida) => {
			bebida.style.display = "block";
		});

		categorias.forEach((categoria) => {
			categoria.style.display = "block";
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const contenedor = document.getElementById("contenido/");
	if (contenedor) {
		fetch("contenido/contenido.html")
			.then((response) => {
				if (!response.ok) {
					throw new Error("No se pudo cargar el contenido.");
				}
				return response.text();
			})
			.then((html) => {
				contenedor.innerHTML = html;
			})
			.catch((error) => {
				console.error("Error al cargar el contenido:", error);
				contenedor.innerHTML = "<p>Error al cargar el contenido.</p>";
			});
	}
});

//! filtros

document.querySelectorAll(".nav-licores a").forEach((enlace) => {
	enlace.addEventListener("click", (evento) => {
		evento.preventDefault(); // Evitar el comportamiento predeterminado del enlace
		const termino = enlace.textContent.toLowerCase(); // Obtener el texto del enlace como término de búsqueda
		const isActive = enlace.classList.contains("activo"); // Verificar si el enlace ya está activo

		// Restablecer todos los enlaces y estilos
		document.querySelectorAll(".nav-licores a").forEach((item) => {
			item.classList.remove("activo");
		});
		const bebidas = document.querySelectorAll(".bebida");
		const categorias = document.querySelectorAll(".categoria");

		if (isActive) {
			// Si el enlace estaba activo, restaurar la vista completa
			bebidas.forEach((bebida) => {
				bebida.style.display = "block";

				// Eliminar resaltados
				const nombreElemento = bebida.querySelector("h3");
				const descripcionElemento = bebida.querySelector("p");
				nombreElemento.innerHTML = nombreElemento.textContent;
				descripcionElemento.innerHTML = descripcionElemento.textContent;
			});

			categorias.forEach((categoria) => {
				categoria.style.display = "block";
			});
		} else {
			// Si no estaba activo, aplicar el filtro
			enlace.classList.add("activo");

			// Filtrar y resaltar bebidas
			bebidas.forEach((bebida) => {
				const textoCompleto = bebida.textContent.toLowerCase();
				if (textoCompleto.includes(termino)) {
					bebida.style.display = "block";

					// Resaltar texto encontrado
					const regex = new RegExp(`(${termino})`, "gi");
					const nombreElemento = bebida.querySelector("h3");
					const descripcionElemento = bebida.querySelector("p");

					// Restaurar el texto original antes de resaltar
					nombreElemento.innerHTML = nombreElemento.textContent;
					descripcionElemento.innerHTML = descripcionElemento.textContent;

					// Aplicar resalte
					nombreElemento.innerHTML = nombreElemento.innerHTML.replace(
						regex,
						`<span class="resaltado">$1</span>`
					);
					descripcionElemento.innerHTML = descripcionElemento.innerHTML.replace(
						regex,
						`<span class="resaltado">$1</span>`
					);
				} else {
					bebida.style.display = "none";
				}
			});

			// Ocultar categorías sin bebidas visibles
			categorias.forEach((categoria) => {
				const bebidasVisibles = categoria.querySelectorAll(
					".bebida[style*='block']"
				);
				if (bebidasVisibles.length > 0) {
					categoria.style.display = "block";
				} else {
					categoria.style.display = "none";
				}
			});
		}
	});
});
