// Lógica para la paginación de la tabla sin JavaScript
const paginationButtons = document.querySelectorAll('.pagination button');
const tableContainer = document.querySelector('.tabla__contenedor');

paginationButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const page = this.dataset.page;

        // Actualiza la página actual
        tableContainer.dataset.page = page;

        // Cambia los estilos activos/desactivados
        paginationButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        // Desactivar el botón si es necesario
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');

        prevButton.classList.toggle('disabled', page == 1);
        nextButton.classList.toggle('disabled', page == 2);
    });
});
