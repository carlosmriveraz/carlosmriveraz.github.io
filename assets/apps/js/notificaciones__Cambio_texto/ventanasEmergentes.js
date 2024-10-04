// Función para mostrar una ventana emergente
export function mostrarVentanaEmergente(titulo, descripcion, urlImagen) {
  // Crear el fondo oscuro (capa superpuesta)
  const capaSuperpuesta = document.createElement("div");
  capaSuperpuesta.id = "capa-superpuesta";

  // Crear el contenedor de la ventana emergente
  const ventanaEmergente = document.createElement("div");
  ventanaEmergente.classList.add("ventana-emergente");

  // Crear el título
  const tituloVentana = document.createElement("h2");
  tituloVentana.innerText = titulo;

  // Crear la descripción
  const descripcionVentana = document.createElement("p");
  descripcionVentana.innerText = descripcion;

  // Crear la imagen
  const imagenVentana = document.createElement("img");
  imagenVentana.src = urlImagen;
  imagenVentana.classList.add("ventana-emergente__imagen");

  // Añadir título, descripción e imagen al contenedor
  ventanaEmergente.appendChild(tituloVentana);
  ventanaEmergente.appendChild(descripcionVentana);
  ventanaEmergente.appendChild(imagenVentana);

  // Añadir la ventana emergente y la capa superpuesta al body
  capaSuperpuesta.appendChild(ventanaEmergente);
  document.body.appendChild(capaSuperpuesta);

  // Cerrar ventana emergente al hacer clic en la capa superpuesta
  capaSuperpuesta.addEventListener("click", () => {
    document.body.removeChild(capaSuperpuesta);
  });
}
