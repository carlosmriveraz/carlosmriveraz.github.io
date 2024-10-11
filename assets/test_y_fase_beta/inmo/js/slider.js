// Variables del slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slider__imagen");
const totalSlides = slides.length;

// Función para mostrar el slide actual
function showSlide(index) {
  const sliderWidth = document.querySelector(".slider__contenedor").offsetWidth;
  const newTransform = -index * sliderWidth;
  document.querySelector(
    ".slider__imagenes"
  ).style.transform = `translateX(${newTransform}px)`;
}

// Función para avanzar al siguiente slide
document.querySelector(".slider__siguiente").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

// Función para retroceder al slide anterior
document.querySelector(".slider__anterior").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

// Mostrar la primera imagen al cargar la página
showSlide(currentSlide);
