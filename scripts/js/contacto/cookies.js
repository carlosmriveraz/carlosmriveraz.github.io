// Función para cargar la página de cookies y el video de bienvenida
function loadCookiesAndVideo() {
  fetch("html/footer/cookies.html") // Ruta correcta al archivo de cookies
    .then((response) => response.text())
    .then((data) => {
      // Insertar el contenido del archivo cookies.html en el contenedor del modal
      document.getElementById("cookiesModalContainer").innerHTML = data;

      // Lógica de la política de cookies
      const cookieModal = document.getElementById("cookieConsentModal");
      const acceptCookies = document.getElementById("acceptCookies");
      const moreInfoButton = document.getElementById("moreInfo");

      // Mostrar el modal si no se ha aceptado antes
      if (!localStorage.getItem("cookiesAccepted")) {
        cookieModal.style.display = "block";
      }

      // Evento para aceptar cookies y guardar en localStorage
      acceptCookies.addEventListener("click", () => {
        cookieModal.style.display = "none";
        localStorage.setItem("cookiesAccepted", "true");
      });

      // Evento para mostrar más información de las cookies
      moreInfoButton.addEventListener("click", () => {
        const moreInfoSection = document.getElementById("cookieMoreInfo");
        if (
          moreInfoSection.style.display === "none" ||
          moreInfoSection.style.display === ""
        ) {
          moreInfoSection.style.display = "block"; // Mostrar más información
        } else {
          moreInfoSection.style.display = "none"; // Ocultar información
        }
      });
    })
    .catch((error) => console.error("Error al cargar cookies.html:", error));
}

// Mostrar la política de cookies y video solo si el usuario no ha aceptado cookies antes
if (!localStorage.getItem("cookiesAccepted")) {
  loadCookiesAndVideo(); // Llamar a la función para cargar el contenido de cookies
}
