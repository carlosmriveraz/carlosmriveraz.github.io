document.addEventListener("DOMContentLoaded", function () {
  const productos = document.querySelectorAll(".producto");

  productos.forEach((producto) => {
    producto.addEventListener("click", function () {
      const nombre = this.querySelector(".producto__nombre").innerText;
      alert(`Has seleccionado: ${nombre}`);
    });

    // Permitir arrastrar el producto
    producto.addEventListener("dragstart", arrastrar);
  });
});

let contadorIngredientes = 0;
let productos = [];

// Permitir arrastrar el producto
function permitirArrastrar(event) {
  event.preventDefault(); // Previene el comportamiento por defecto
}

// Iniciar el arrastre
function arrastrar(event) {
  const nombreProducto =
    event.target.querySelector(".producto__nombre").innerText;
  const precioProducto =
    event.target.querySelector(".producto__precio").innerText;

  // Usamos el nombre del producto como datos
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ nombre: nombreProducto, precio: precioProducto })
  );
}

// Soltar el producto en el contenedor
function soltar(event) {
  event.preventDefault(); // Evitar el comportamiento por defecto

  const data = event.dataTransfer.getData("text/plain");
  const { nombre, precio } = JSON.parse(data);

  // Clonar el producto (no necesitas un ID, solo un clone)
  const productoClonado = document.createElement("div");
  productoClonado.classList.add("producto", "agregado");
  productoClonado.innerHTML = `<h3 class="producto__nombre">${nombre}</h3><p class="producto__precio">${precio}</p>`;

  // Añadir el producto al contenedor de receta
  const contenedorReceta = document.getElementById("contenedorReceta");
  contenedorReceta.appendChild(productoClonado);

  // Actualizar el contador de ingredientes
  contadorIngredientes++;
  document.getElementById(
    "contadorIngredientes"
  ).innerText = `Ingredientes: ${contadorIngredientes}`;

  // Actualizar la tabla de acumulado
  agregarProductoTabla(nombre, precio);
}

// Agregar productos a la tabla de acumulado
function agregarProductoTabla(nombre, descripcion) {
  const listaProductos = document.getElementById("listaProductos");
  let encontrado = false;

  // Verificar si el producto ya existe en la tabla
  productos.forEach((producto) => {
    if (producto.nombre === nombre) {
      producto.cantidad++;
      encontrado = true;
    }
  });

  // Si no está en la lista, agregarlo
  if (!encontrado) {
    productos.push({ nombre, descripcion, cantidad: 1 });
  }

  // Ordenar los productos alfabéticamente
  productos.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Limpiar la tabla
  listaProductos.innerHTML = "";

  // Rellenar la tabla con los productos actualizados
  productos.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${producto.nombre}</td><td>${producto.descripcion}</td><td>${producto.cantidad}</td>`;
    listaProductos.appendChild(row);
  });
}
