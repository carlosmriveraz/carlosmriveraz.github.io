document.addEventListener("DOMContentLoaded", () => {
  // Kanban: Agregar tareas con el botón
  document
    .getElementById("agregar-tarea")
    .addEventListener("click", function () {
      const entradaTarea = document.getElementById("entrada-tarea");
      const textoTarea = entradaTarea.value.trim();
      if (textoTarea !== "") {
        const nuevaTarea = document.createElement("li");
        nuevaTarea.classList.add("tarea");
        nuevaTarea.textContent = textoTarea;
        nuevaTarea.draggable = true;

        nuevaTarea.onclick = () => moverTarea(nuevaTarea);

        nuevaTarea.id = `tarea-${Date.now()}`;

        // Agregar botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("eliminar-tarea");
        botonEliminar.addEventListener("click", function () {
          nuevaTarea.remove();
          actualizarNotificaciones();
        });
        nuevaTarea.appendChild(botonEliminar);

        agregarEventosTarea(nuevaTarea);
        document
          .getElementById("pendientes")
          .querySelector("ul")
          .appendChild(nuevaTarea);
        entradaTarea.value = "";
        actualizarNotificaciones();
      }
    });

  function agregarEventosTarea(tarea) {
    tarea.addEventListener("dragstart", dragStart);
    tarea.addEventListener("dragend", dragEnd);
    tarea.addEventListener("dblclick", function () {
      const currentColumn = tarea.parentElement;
      const tareaNombre = tarea.textContent.trim();
      if (currentColumn.id === "pendientes") {
        document
          .getElementById("en-proceso")
          .querySelector("ul")
          .appendChild(tarea);
        Notificaciones.mostrarNotificacion(
          `La tarea '${tareaNombre}' ha sido movida a En Proceso`
        );
      } else if (currentColumn.id === "en-proceso") {
        document
          .getElementById("pendientes")
          .querySelector("ul")
          .appendChild(tarea);
        Notificaciones.mostrarNotificacion(
          `La tarea '${tareaNombre}' ha sido movida a Pendientes`
        );
      }
      actualizarNotificaciones();
    });
  }

  function permitirDrop(event) {
    event.preventDefault();
  }

  function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  function dragEnd(event) {
    event.target.style.display = "block";
  }

  function drop(event) {
    event.preventDefault();
    const idTarea = event.dataTransfer.getData("text");
    const tarea = document.getElementById(idTarea);
    const contenedor = event.currentTarget.querySelector("ul");
    const tareaNombre = tarea.textContent.trim();

    if (contenedor.id !== "terminadas") {
      contenedor.appendChild(tarea);
      const nuevaColumna =
        contenedor.parentElement.querySelector("h3").textContent;
      Notificaciones.mostrarNotificacion(
        `La tarea '${tareaNombre}' ha sido movida a ${nuevaColumna}`
      );
    } else {
      tarea.remove();
    }
    actualizarNotificaciones();
  }

  function actualizarNotificaciones() {
    const pendientes = document
      .getElementById("pendientes")
      .querySelectorAll("li").length;
    const enProceso = document
      .getElementById("en-proceso")
      .querySelectorAll("li").length;
    const terminadas = document
      .getElementById("terminadas")
      .querySelectorAll("li").length;

    const mensaje = `Pendientes: ${pendientes}, En Proceso: ${enProceso}, Terminadas: ${terminadas}`;
    Notificaciones.mostrarNotificacion(mensaje);
  }

  // Asignar eventos para tareas existentes
  document.querySelectorAll(".tarea").forEach(agregarEventosTarea);

  // Habilitar drag and drop para columnas
  document.querySelectorAll(".columna").forEach((columna) => {
    columna.addEventListener("dragover", permitirDrop);
    columna.addEventListener("drop", drop);
  });

  actualizarNotificaciones();
});

document.querySelectorAll(".tarea").forEach((tarea) => {
  tarea.addEventListener("dblclick", function () {
    const currentColumn = tarea.parentElement;

    if (currentColumn.id === "pendientes") {
      document
        .getElementById("en-proceso")
        .querySelector("ul")
        .appendChild(tarea);
      Notificaciones.mostrarNotificacion("Tarea movida a En Proceso");
    } else if (currentColumn.id === "en-proceso") {
      document
        .getElementById("pendientes")
        .querySelector("ul")
        .appendChild(tarea);
      Notificaciones.mostrarNotificacion("Tarea movida a Pendientes");
    }
    actualizarNotificaciones();
  });
});

function moverTarea(tareaElemento) {
  const listaActual = tareaElemento.parentNode; // Obtener la lista actual
  const columnaActual = listaActual.parentNode.id; // Obtener el id de la columna actual

  let nuevaColumnaId;
  if (columnaActual === "pendientes") {
    nuevaColumnaId = "en-proceso"; // Mover de Pendientes a En Proceso
  } else if (columnaActual === "en-proceso") {
    nuevaColumnaId = "terminadas"; // Mover de En Proceso a Terminadas
  } else {
    nuevaColumnaId = "pendientes"; // Mover de Terminadas a Pendientes
  }

  const nuevaLista = document
    .getElementById(nuevaColumnaId)
    .querySelector("ul");
  nuevaLista.appendChild(tareaElemento); // Mover la tarea a la nueva columna
}
