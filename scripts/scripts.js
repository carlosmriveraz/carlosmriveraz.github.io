document.addEventListener("DOMContentLoaded", function () {
	const menuIcon = document.querySelector(".menu-icon");
	const navMenu = document.querySelector(".navbar_menu");
	const darkModeIcon = document.getElementById("dark-mode-icon");
	const lightModeIcon = document.getElementById("light-mode-icon");

	menuIcon.addEventListener("click", function () {
		navMenu.classList.toggle("active");
	});

	darkModeIcon.addEventListener("click", function () {
		document.body.classList.add("dark-mode");
		darkModeIcon.style.display = "none";
		lightModeIcon.style.display = "block";
	});

	lightModeIcon.addEventListener("click", function () {
		document.body.classList.remove("dark-mode");
		lightModeIcon.style.display = "none";
		darkModeIcon.style.display = "block";
	});
});
