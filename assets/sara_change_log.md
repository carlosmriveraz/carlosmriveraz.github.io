# fecha:2024-10-02

## cambios grades

Para integrar los tres módulos (ventanasEmergentes.js, juego.js, y textos.js) con tu lógica de juego en el archivo logica_juego.js, primero nos aseguraremos de que el juego muestre una ventana emergente cuando se gane o se pierda. También modificaremos el manejo de la lógica del juego de encontrar "Sara" y el temporizador.
Aquí tienes el código actualizado para logica_juego.js:

javascript

// logica_juego.js
import { mostrarVentanaEmergente } from 'notificaciones**Cambio_texto/ventanasEmergentes.js';
import { generarTextoAleatorio } from 'notificaciones**Cambio_texto/textos.js';

// Obtener todos los elementos de texto
const texts = document.querySelectorAll(".texto");
let capturedCount = 0;
let divsRestantes = texts.length;
let timer;
let tiempoRestante = 120; // Tiempo en segundos (2 minutos)

// Actualizar marcadores
document.getElementById("divs-restantes").innerText = divsRestantes;

// Función para buscar el div que contiene "Sara"
function findSara() {
return Array.from(texts).find((text) => text.innerText === "Sara");
}

// Función para mover "Sara" a un nuevo div aleatorio
function moveSara() {
const saraDiv = findSara(); // Buscar el div actual que contiene "Sara"

    // Ocultar el div actual y quitar el texto
    saraDiv.style.display = "none";
    saraDiv.innerText = "";

    capturedCount++;
    divsRestantes--;

    // Actualizar marcadores
    document.getElementById("divs-capturados").innerText = capturedCount;
    document.getElementById("divs-restantes").innerText = divsRestantes;

    // Verificar si se ganó el juego
    if (divsRestantes === 0) {
    	clearInterval(timer); // Detener el temporizador
    	mostrarVentanaEmergente(
    		generarTextoAleatorio('ganar'),
    		"¡Has capturado todos los textos con éxito!",
    		"url_de_imagen_victoria.png"
    	);
    	return;
    }

    // Generar un nuevo índice aleatorio que sea diferente del actual
    let newSaraDiv;
    do {
    	const randomIndex = Math.floor(Math.random() * texts.length);
    	newSaraDiv = texts[randomIndex];
    } while (newSaraDiv.style.display === "none"); // No mover a un div que ya haya sido ocultado

    // Asignar el texto "Sara" al nuevo div
    newSaraDiv.innerText = "Sara";

}

// Función para manejar el clic en el texto
function handleClick(event) {
const clickedDiv = event.target;

    // Solo permitir que se haga clic en el div con "Sara"
    if (clickedDiv.innerText === "Sara") {
    	moveSara(); // Mover "Sara" a otro div aleatorio
    } else {
    	alert("¡Debes tocar el texto 'Sara' para continuar!");
    }

}

// Temporizador
function startTimer() {
timer = setInterval(() => {
tiempoRestante--;
let minutes = Math.floor(tiempoRestante / 60);
let seconds = tiempoRestante % 60;

    	// Formatear segundos con 2 dígitos
    	seconds = seconds < 10 ? "0" + seconds : seconds;
    	document.getElementById("tiempo-restante").innerText =
    		minutes + ":" + seconds;

    	// Si el tiempo se acaba
    	if (tiempoRestante <= 0) {
    		clearInterval(timer);
    		mostrarVentanaEmergente(
    			generarTextoAleatorio('perder'),
    			"El tiempo se ha agotado. No lograste capturar todos los textos.",
    			"url_de_imagen_derrota.png"
    		);
    		// Deshabilitar clics en los divs
    		texts.forEach((text) => {
    			text.removeEventListener("click", handleClick);
    		});
    	}
    }, 1000);

}

// Añadir el evento de clic solo a los divs que contienen "Sara"
texts.forEach((text) => {
text.addEventListener("click", handleClick);
});

// Iniciar el temporizador
startTimer();

Explicación de los cambios:

    Ventana emergente al ganar o perder: Cuando se gana el juego (capturando todos los textos con "Sara") o se pierde (el tiempo se acaba), se invoca mostrarVentanaEmergente() desde el módulo ventanasEmergentes.js. Este método genera la ventana emergente correspondiente, mostrando mensajes y una imagen adecuada para cada situación.

    Generación de textos aleatorios: Utilizamos la función generarTextoAleatorio() del módulo textos.js para generar textos aleatorios tanto para la victoria como para la derrota.

    Temporizador y lógica del juego: El temporizador sigue corriendo y al finalizar, si no se han capturado todos los textos, muestra la ventana emergente de derrota.
