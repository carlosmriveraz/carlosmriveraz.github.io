document.addEventListener("DOMContentLoaded", function () {
  const productos = document.querySelectorAll(".producto");

  productos.forEach((producto) => {
    // Permitir doble clic para agregar el producto
    producto.addEventListener("dblclick", function () {
      const nombre = this.querySelector(".producto__nombre").innerText;
      const precio = this.querySelector(".producto__precio").innerText;
      agregarProductoAlContenedor(nombre, precio);
      agregarProductoTabla(nombre, precio);
    });

    // Permitir arrastrar el producto
    producto.addEventListener("dragstart", arrastrar);
  });
});

let contadorIngredientes = 0;
let productos = [];
let totalPrecio = 0;

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

  // Agregar producto tanto al contenedor como a la tabla
  agregarProductoAlContenedor(nombre, precio);
  agregarProductoTabla(nombre, precio);
}

// Agregar productos al contenedor de recetas
function agregarProductoAlContenedor(nombre, precio) {
  const contenedorReceta = document.getElementById("contenedorReceta");

  // Verificar si ya existe ese producto en el contenedor
  const productosExistentes = Array.from(
    contenedorReceta.querySelectorAll(".agregado")
  ).filter((el) => el.querySelector(".producto__nombre").innerText === nombre);

  // Si el producto no está ya en el contenedor, agregarlo
  if (productosExistentes.length === 0) {
    const productoClonado = document.createElement("div");
    productoClonado.classList.add("producto", "agregado");
    productoClonado.innerHTML = `
      <h3 class="producto__nombre">${nombre}</h3>
      <p class="producto__precio">${formatearPesos(precio)}</p>
    `;

    // Añadir el producto al contenedor de receta
    contenedorReceta.appendChild(productoClonado);

    // Actualizar el contador de ingredientes
    contadorIngredientes++;
    document.getElementById(
      "contadorIngredientes"
    ).innerText = `Ingredientes: ${contadorIngredientes}`;
  }
}

// Formatear los precios correctamente en pesos colombianos
function formatearPesos(precio) {
  const precioNumerico = parseFloat(precio.toString().replace(/\D/g, "")); // Remover cualquier carácter no numérico (ej. comas)
  return precioNumerico.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // No mostrar decimales
    maximumFractionDigits: 0,
  });
}

// Eliminar producto del contenedor y la tabla
function eliminarProducto(nombre, productoElemento) {
  productoElemento.remove();
  contadorIngredientes--;
  document.getElementById(
    "contadorIngredientes"
  ).innerText = `Ingredientes: ${contadorIngredientes}`;

  productos = productos.filter((producto) => producto.nombre !== nombre);
  actualizarTabla();
}

// Actualizar la tabla de productos
function actualizarTabla() {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";

  productos.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${formatearPesos(producto.precio)}</td>
      <td>${producto.cantidad}</td>
      <td>
        <button class="boton-menos">-</button>
        <button class="boton-mas">+</button>
      </td>
    `;
    listaProductos.appendChild(row);

    // Botón para agregar más productos
    row.querySelector(".boton-mas").addEventListener("click", function () {
      producto.cantidad++;
      agregarProductoAlContenedor(producto.nombre, producto.precio); // Agregar producto al contenedor
      actualizarTabla();
    });

    // Botón para quitar productos
    row.querySelector(".boton-menos").addEventListener("click", function () {
      if (producto.cantidad > 1) {
        producto.cantidad--;
        eliminarProductoDelContenedor(producto.nombre); // Eliminar una instancia del contenedor
      } else {
        productos = productos.filter((p) => p.nombre !== producto.nombre);
        eliminarProductoDelContenedor(producto.nombre, true); // Eliminar todas las instancias
      }
      actualizarTabla();
    });
  });

  actualizarTotal();
}

// Eliminar una instancia del contenedor de receta
function eliminarProductoDelContenedor(nombre, eliminarTodo = false) {
  const productosClonados = Array.from(
    document.querySelectorAll(".agregado")
  ).filter((el) => el.querySelector(".producto__nombre").innerText === nombre);

  if (eliminarTodo) {
    productosClonados.forEach((productoClonado) => productoClonado.remove());
  } else {
    if (productosClonados.length > 0) {
      productosClonados[0].remove(); // Eliminar solo uno
    }
  }

  contadorIngredientes--;
  document.getElementById(
    "contadorIngredientes"
  ).innerText = `Ingredientes: ${contadorIngredientes}`;
}

// Agregar productos a la tabla de acumulado
function agregarProductoTabla(nombre, precio) {
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
    productos.push({ nombre, precio, cantidad: 1 });
  }

  actualizarTabla();
}

// Actualizar el total de precios
function actualizarTotal() {
  const totalElem = document.getElementById("totalPrecio");

  let totalPrecio = productos.reduce((total, producto) => {
    const precioNumerico = parseFloat(
      producto.precio.toString().replace(/\D/g, "")
    ); // Convertir el precio a número sin comas
    return total + precioNumerico * producto.cantidad;
  }, 0);

  totalElem.innerText = formatearPesos(totalPrecio);
}
