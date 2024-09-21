// Cargar la configuración inicial al cargar la página
window.addEventListener('load', Configuracion.cargarConfiguracion);

// Mostrar/ocultar el menú de configuración con el icono de hamburguesa
document
    .getElementById('toggle-config')
    .addEventListener('click', Configuracion.toggleMenuConfiguracion);


        // Notas rápidas
        document.getElementById('agregar-nota').addEventListener('click', function () {
            const nuevaNota = document.createElement('div');
            nuevaNota.classList.add('nota');

            const textoNota = document.createElement('textarea');
            nuevaNota.appendChild(textoNota);

            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('eliminar-nota');
            botonEliminar.textContent = 'X';
            botonEliminar.addEventListener('click', () => nuevaNota.remove());
            nuevaNota.appendChild(botonEliminar);

            document.querySelector('.notas-rapidas').appendChild(nuevaNota);
        });
