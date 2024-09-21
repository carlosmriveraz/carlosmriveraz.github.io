const Configuracion = (() => {
  // Función para aplicar la configuración y cerrar el menú
  function aplicarConfiguracion() {
    const nuevoTiempoTrabajo = parseInt(
      document.getElementById("tiempo-trabajo").value,
      10
    );

    const nuevoTiempoDescanso = parseInt(
      document.getElementById("tiempo-descanso").value,
      10
    );
    const nuevoTiempoAlerta = parseInt(
      document.getElementById("tiempo-alerta").value,
      10
    );

    // Aplicar los nuevos tiempos al reloj
    RelojPomodoro.establecerTiempoTrabajo(nuevoTiempoTrabajo);
    RelojPomodoro.establecerTiempoDescanso(nuevoTiempoDescanso);
    RelojPomodoro.establecerTiempoAlerta(nuevoTiempoAlerta);

    // Guardar la configuración en localStorage
    guardarConfiguracion();

    // Ocultar el menú de configuración después de aplicar los cambios
    ocultarMenuConfiguracion();
  }

  // Función para guardar la configuración en localStorage
  function guardarConfiguracion() {
    const notificacionesHabilitadas = document.getElementById(
      "notificacionesHabilitadas"
    ).checked;
    localStorage.setItem(
      "notificacionesHabilitadas",
      notificacionesHabilitadas
    );
    localStorage.setItem(
      "tiempoTrabajo",
      document.getElementById("tiempo-trabajo").value
    );
    localStorage.setItem(
      "tiempoDescanso",
      document.getElementById("tiempo-descanso").value
    );
    localStorage.setItem(
      "tiempoAlerta",
      document.getElementById("tiempo-alerta").value
    );
  }

  // Función para cargar la configuración desde localStorage
  function cargarConfiguracion() {
    const notificacionesHabilitadas =
      localStorage.getItem("notificacionesHabilitadas") === "true";
    document.getElementById("notificacionesHabilitadas").checked =
      notificacionesHabilitadas;

    if (notificacionesHabilitadas) {
      Notificaciones.iniciarNotificaciones();
    } else {
      Notificaciones.detenerNotificaciones();
    }

    // Aplicar configuración desde localStorage a los elementos del DOM
    document.getElementById("tiempo-trabajo").value =
      localStorage.getItem("tiempoTrabajo") || 25;
    document.getElementById("tiempo-descanso").value =
      localStorage.getItem("tiempoDescanso") || 5;
    document.getElementById("tiempo-alerta").value =
      localStorage.getItem("tiempoAlerta") || 55;
  }

  // Función para ocultar el menú de configuración
  function ocultarMenuConfiguracion() {
    document.getElementById("toggle-config").checked = false;
  }

  return {
    aplicarConfiguracion,
    guardarConfiguracion,
    cargarConfiguracion,
    ocultarMenuConfiguracion,
  };
})();

// Asignar eventos
document
  .getElementById("toggle-config")
  .addEventListener("click", Configuracion.toggleMenuConfiguracion);

document
  .getElementById("aplicar-config")
  .addEventListener("click", Configuracion.aplicarConfiguracion);

document
  .getElementById("notificacionesHabilitadas")
  .addEventListener("change", Configuracion.guardarConfiguracion);
