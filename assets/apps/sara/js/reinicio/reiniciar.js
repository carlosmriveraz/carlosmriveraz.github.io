import { iniciarJuego } from "../logica_juego.js"; // Asegúrate de que la ruta sea correcta
import { detenerTodosLosSonidos } from "../sonido/sonido.js";

let tiempoRestante = 120; // 2 minutos en segundos

export function reiniciarJuego() {
  if (window.timer) {
    clearInterval(window.timer); // Detener el temporizador si está activo
    tiempoRestante = 120; // Reiniciar el tiempo a 2 minutos
  }
  iniciarJuego.timer = null;
  detenerTodosLosSonidos(); // Detener todos los sonidos

  // Restablecer los contadores y el temporizador en 2:00 minutos
  document.getElementById("divs-restantes").innerText = "20";
  document.getElementById("divs-capturados").innerText = "0";

  // Restablecer el tablero con los divs mencionados
  const tablero = document.getElementById("game-board");
  tablero.innerHTML = `
    <div class="texto texto__1">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__22">
      Sofi
      <img src="./imagenes/fresa_gano.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__1">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__25">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__1">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__22">
      Sofi
      <img src="./imagenes/fresa_gano.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__33">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__55">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__8">
      <img src="./imagenes/fresa_gano.png" alt="fresa sarita juego Amalia carlosmariorivera.com" /> cata
    </div>

    <div class="texto texto__1">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__1">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__19">
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__1">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__30">
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__25 to__29">
      Amalia1
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__29">
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego Amalia carlosmariorivera.com" />
    </div>

    <div class="texto texto__33">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__44">
      cata
      <img src="./imagenes/fresa.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>

    <div class="texto texto__94">Sara</div>

    <div class="texto texto__1">
      Amalia
      <img src="./imagenes/fresa_sarita.png" alt="fresa sarita juego cata carlosmariorivera.com" />
    </div>
  `;

  // Reiniciar el juego
  iniciarJuego(); // Llama a la función para iniciar de nuevo el juego
}
