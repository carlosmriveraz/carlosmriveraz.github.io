const AlarmaPomodoro = (() => {
  let alarmaActiva = false;
  let intervaloAlarma;

  // Función para activar la alarma
  function activarAlarma() {
    if (!alarmaActiva) {
      alarmaActiva = true;
      document.body.classList.add("alarma-activa");

      const imagenAlerta = document.getElementById("imagen-alerta");
      imagenAlerta.style.display = "block"; // Mostrar la imagen de alerta

      // Alternar el color de fondo cada 0.5 segundos
      intervaloAlarma = setInterval(() => {
        document.body.style.backgroundColor =
          document.body.style.backgroundColor === "red" ? "#282c34" : "red";
      }, 500);
    }
  }

  // Función para desactivar la alarma
  function desactivarAlarma() {
    if (alarmaActiva) {
      clearInterval(intervaloAlarma);
      alarmaActiva = false;
      document.body.classList.remove("alarma-activa");
      document.body.style.backgroundColor = "#282c34"; // Volver al color original

      const imagenAlerta = document.getElementById("imagen-alerta");
      imagenAlerta.style.display = "none"; // Ocultar la imagen de alerta
    }
  }

  return {
    activarAlarma,
    desactivarAlarma,
  };
})();
