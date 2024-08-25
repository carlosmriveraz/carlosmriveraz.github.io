/** @format */

import {updateYear} from "./year.js";
import {seleccionar_enlaces} from "./js/seleccionar_enlaces.js";
import {resaltarEnlaceActivo, desplazamientoSuave, alternarMenu, alternarTema} from "./js/navbar/cambio_de_menu.js";
import {revelarIframes} from "./js/ocular_seccion.js";

// Ejecutar la función para actualizar el año
updateYear();

// Inicializar el manejo de enlaces
seleccionar_enlaces();

// Inicializar el resaltado de enlace activo
resaltarEnlaceActivo();

// Agregar eventos de clic a los enlaces de navegación para desplazamiento suave
desplazamientoSuave();

// Agregar funcionalidad al menú de hamburguesa
alternarMenu();

// Agregar funcionalidad para alternar el tema
alternarTema();

// Inicializar la revelación de iframes
revelarIframes();

