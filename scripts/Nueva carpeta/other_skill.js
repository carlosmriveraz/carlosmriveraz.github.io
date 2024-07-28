document.addEventListener("DOMContentLoaded", () => {
	const skillsItems = document.querySelectorAll(".other-skills-item");
	const animations = [
		"bounce",
		"flash",
		"pulse",
		"rubberBand",
		"shakeX",
		"shakeY",
		"headShake",
		"swing",
		"tada",
		"wobble",
		"jello",
		"heartBeat",
		"bounceIn",
		"bounceInDown",
		"bounceInLeft",
		"bounceInRight",
		"bounceInUp",
		"bounceOut",
		"bounceOutDown",
		"bounceOutLeft",
		"bounceOutRight",
		"bounceOutUp",
		"fadeIn",
		"fadeInDown",
		"fadeInDownBig",
		"fadeInLeft",
		"fadeInLeftBig",
		"fadeInRight",
		"fadeInRightBig",
		"fadeInUp",
		"fadeInUpBig",
		"fadeOut",
		"fadeOutDown",
		"fadeOutDownBig",
		"fadeOutLeft",
		"fadeOutLeftBig",
		"fadeOutRight",
		"fadeOutRightBig",
		"fadeOutUp",
		"fadeOutUpBig",
		"flip",
		"flipInX",
		"flipInY",
		"flipOutX",
		"flipOutY",
		"lightSpeedIn",
		"lightSpeedOut",
		"rotateIn",
		"rotateInDownLeft",
		"rotateInDownRight",
		"rotateInUpLeft",
		"rotateInUpRight",
		"rotateOut",
		"rotateOutDownLeft",
		"rotateOutDownRight",
		"rotateOutUpLeft",
		"rotateOutUpRight",
		"slideInUp",
		"slideInDown",
		"slideInLeft",
		"slideInRight",
		"slideOutUp",
		"slideOutDown",
		"slideOutLeft",
		"slideOutRight",
		"zoomIn",
		"zoomInDown",
		"zoomInLeft",
		"zoomInRight",
		"zoomInUp",
		"zoomOut",
		"zoomOutDown",
		"zoomOutLeft",
		"zoomOutRight",
		"zoomOutUp",
		"text-1",
		"text-2",
		"text-3",
		"text-4",
		"text-5",
		"text-6",
		"text-7",
		"text-8",
		"text-9",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-1",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-2",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-3",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-4",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-5",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-6",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-7",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-8",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-9",
		"text-100",
	];
	const colors = [
		"var(--color-paleta1)",
		"var(--color-paleta2)",
		"var(--color-paleta3)",
		"var(--color-paleta4)",
		"var(--color-paleta5)",
		"var(--color-paleta6)",
	];
	const sizes = [
		"var(--size-tercertitulo)",
		"var(--size-texto)",
		"var(--size-segundotexto)",
		"var(--size-tercertexto)",
	];

	skillsItems.forEach((item) => {
		item.addEventListener("mouseover", () => {
			// Elegir una animación, color y tamaño al azar
			const randomAnimation =
				animations[Math.floor(Math.random() * animations.length)];
			const randomColor =
				colors[Math.floor(Math.random() * colors.length)];
			const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

			// Aplicar animación
			item.classList.add(
				"animate__animated",
				`animate__${randomAnimation}`
			);

			// Cambiar color y tamaño del texto
			item.style.color = randomColor;
			item.style.fontSize = randomSize;

			// Mostrar el nombre de la animación
			const animationNameElement = document.createElement("span");
			animationNameElement.className = "animation-name";
			animationNameElement.innerText = ` (Animación: ${randomAnimation})`;
			item.querySelector("p").appendChild(animationNameElement);
		});

		item.addEventListener("mouseout", () => {
			// Eliminar todas las animaciones
			animations.forEach((animation) => {
				item.classList.remove(
					"animate__animated",
					`animate__${animation}`
				);
			});

			// Revertir color y tamaño del texto
			item.style.color = "";
			item.style.fontSize = "";

			// Eliminar el nombre de la animación
			const animationNameElement = item.querySelector(".animation-name");
			if (animationNameElement) {
				animationNameElement.remove();
			}
		});
	});
});

//#region
/* document.addEventListener("DOMContentLoaded", () => {
	const finalDiv = document.querySelector(".final");
	const hoverMessage = document.getElementById("hover-message");

	finalDiv.addEventListener("mouseover", () => {
		hoverMessage.classList.add("show");

		// Ocultar el mensaje después de 5 segundos
		setTimeout(() => {
			hoverMessage.classList.remove("show");
		}, 5000);
	});

	finalDiv.addEventListener("mouseout", () => {
		hoverMessage.classList.remove("show");
	});
});
 */
//#region
document.addEventListener("DOMContentLoaded", () => {
	const finalDiv = document.querySelector(".final");
	const hoverMessage = document.getElementById("hover-message");
	const messageContent = document.getElementById("message-content");

	const messages = [
		"Amo",
		"A",
		"Mi",
		"Mamá",
		"...",
	];

	let messageIndex = 0;

	finalDiv.addEventListener("mouseenter", () => {
		// Cambiar el contenido del mensaje
		messageContent.textContent = messages[messageIndex];
		// Mostrar el mensaje
		hoverMessage.classList.add("show");

		// Cambiar al siguiente mensaje, volviendo al primero si se alcanza el final del array
		messageIndex = (messageIndex + 1) % messages.length;

		// Ocultar el mensaje después de 5 segundos
		setTimeout(() => {
			hoverMessage.classList.remove("show");
		}, 5000);
	});

	finalDiv.addEventListener("mouseleave", () => {
		hoverMessage.classList.remove("show");
	});
});
