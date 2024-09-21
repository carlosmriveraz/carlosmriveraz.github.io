const Notificaciones = (() => {
  let notificaciones = [
    "Notificación 1: Tienes una nueva tarea.",
    "Notificación 2: Recuerda hacer una pausa.",
    "Notificación 3: Tiempo de descanso terminado.",
  ];
  let indiceNotificacionActual = 0;

  // Función para mostrar la notificación actual y avanzar a la siguiente
  function mostrarNotificacion() {
    if (notificaciones.length > 0) {
      const mensaje = notificaciones[indiceNotificacionActual];
      showNotification(mensaje);
      indiceNotificacionActual =
        (indiceNotificacionActual + 1) % notificaciones.length;
    }
  }

  function showNotification(mensaje) {
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = mensaje;
    notificationContainer.style.display = "block";

    setTimeout(() => {
      notificationContainer.style.display = "none";
    }, 5000); // Mostrar cada notificación por 5 segundos
  }

  // Función para iniciar el ciclo de notificaciones
  function iniciarNotificaciones() {
    window.notificationInterval = setInterval(mostrarNotificacion, 20000);
  }

  // Función para detener el ciclo de notificaciones
  function detenerNotificaciones() {
    clearInterval(window.notificationInterval);
  }

  return {
    mostrarNotificacion,
    iniciarNotificaciones,
    detenerNotificaciones,
  };
})();
