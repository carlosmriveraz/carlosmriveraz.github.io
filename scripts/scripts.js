// Archivo: scripts.js

document.addEventListener("DOMContentLoaded", function () {
	const menuIcon = document.querySelector(".menu-icon");
	const navMenu = document.querySelector(".navbar ul");

	menuIcon.addEventListener("click", function () {
		navMenu.classList.toggle("active");
	});
});



// script.js

// Selecciona el botón del menú y la lista de navegación
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar ul');

// Agrega un evento de clic al botón del menú
menuToggle.addEventListener('click', () => {
    // Alterna la clase 'active' en la lista de navegación
    navbar.classList.toggle('active');
});
