const RelojPomodoro = (() => {
  let tiempoTrabajo = 25 * 60; // 25 minutos en segundos
  let tiempoDescanso = 5 * 60; // 5 minutos en segundos
  let tiempoAlerta = 30; // 30 segundos antes de que termine el tiempo
  let tiempoRestante = tiempoTrabajo; // Tiempo restante inicializado al tiempo de trabajo
  let temporizador; // Variable para almacenar el temporizador
  let enDescanso = false; // Estado para saber si estamos en tiempo de descanso

  // Función para actualizar la pantalla del reloj
  function actualizarPantalla(id, tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    document.getElementById(id).textContent = `${String(minutos).padStart(
      2,
      "0"
    )}:${String(segundos).padStart(2, "0")}`;
  }

  // Función para iniciar el temporizador
  function iniciarTemporizador() {
    if (!temporizador) {
      temporizador = setInterval(() => {
        tiempoRestante--;
        if (enDescanso) {
          actualizarPantalla("pantalla-descanso", tiempoRestante); // Actualizar pantalla de descanso
        } else {
          actualizarPantalla("pantalla", tiempoRestante); // Actualizar pantalla de trabajo
        }
        actualizarProgreso(); // Actualizar la barra de progreso

        // Activar la alarma cuando queden 30 segundos
        if (tiempoRestante === tiempoAlerta) {
          AlarmaPomodoro.activarAlarma();
        }

        // Si el tiempo llega a 0, cambiar entre trabajo y descanso
        if (tiempoRestante <= 0) {
          clearInterval(temporizador);
          temporizador = null;

          enDescanso = !enDescanso; // Cambiar de modo
          tiempoRestante = enDescanso ? tiempoDescanso : tiempoTrabajo;

          // Mostrar notificación y actualizar pantalla
          const mensaje = enDescanso
            ? "¡Tiempo de descanso!"
            : "¡Tiempo de trabajo!";
          Notificaciones.mostrarNotificacion(mensaje);

          // Actualizar la pantalla y barra de progreso
          if (enDescanso) {
            actualizarPantalla("pantalla-descanso", tiempoRestante);
          } else {
            actualizarPantalla("pantalla", tiempoRestante);
          }

          AlarmaPomodoro.desactivarAlarma();
          iniciarTemporizador(); // Iniciar el siguiente ciclo automáticamente
        }
      }, 1000);
    }
  }

  // Función para pausar el temporizador
  function pausarTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
    AlarmaPomodoro.desactivarAlarma(); // Asegurarse de que la alarma se desactive al pausar
  }

  // Función para reiniciar el temporizador
  function reiniciarTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
    enDescanso = false; // Reiniciar siempre al modo de trabajo
    tiempoRestante = tiempoTrabajo;
    actualizarPantalla("pantalla", tiempoRestante);
    actualizarPantalla("pantalla-descanso", tiempoDescanso); // Restablecer pantalla de descanso
    AlarmaPomodoro.desactivarAlarma(); // Asegurarse de que la alarma se desactive al reiniciar
    actualizarProgreso(); // Restablecer la barra de progreso
  }

  // Función para configurar el tiempo de trabajo
  function establecerTiempoTrabajo(nuevoTiempoTrabajo) {
    tiempoTrabajo = nuevoTiempoTrabajo * 60;
    if (!enDescanso) {
      tiempoRestante = tiempoTrabajo;
      actualizarPantalla("pantalla", tiempoRestante);
    }
  }

  // Función para configurar el tiempo de descanso
  function establecerTiempoDescanso(nuevoTiempoDescanso) {
    tiempoDescanso = nuevoTiempoDescanso * 60;
    if (enDescanso) {
      tiempoRestante = tiempoDescanso;
      actualizarPantalla("pantalla-descanso", tiempoRestante);
    }
  }

  // Función para configurar el tiempo de alerta
  function establecerTiempoAlerta(nuevoTiempoAlerta) {
    tiempoAlerta = nuevoTiempoAlerta;
  }

  // Función para actualizar la barra de progreso
  function actualizarProgreso() {
    const tiempoTotal = enDescanso ? tiempoDescanso : tiempoTrabajo;
    const porcentaje = ((tiempoTotal - tiempoRestante) / tiempoTotal) * 100;
    document.getElementById("barra-progreso").style.width = `${porcentaje}%`;
  }

  return {
    iniciarTemporizador,
    pausarTemporizador,
    reiniciarTemporizador,
    establecerTiempoTrabajo,
    establecerTiempoDescanso,
    establecerTiempoAlerta,
  };
})();

// Asignar eventos a los botones
document
  .getElementById("iniciar")
  .addEventListener("click", RelojPomodoro.iniciarTemporizador);
document
  .getElementById("pausar")
  .addEventListener("click", RelojPomodoro.pausarTemporizador);
document
  .getElementById("reiniciar")
  .addEventListener("click", RelojPomodoro.reiniciarTemporizador);
