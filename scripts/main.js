import { loadCookiesAndVideo } from "./contacto/cookies.js";

// Mostrar la política sde cookies y video solo si el usuario no ha aceptado cookies antes
if (!localStorage.getItem("cookiesAccepted")) {
  loadCookiesAndVideo(); // Llamar a la función para cargar el contenido de cookies
}
