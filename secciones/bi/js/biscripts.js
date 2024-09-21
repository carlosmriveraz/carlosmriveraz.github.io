document.addEventListener('DOMContentLoaded', () => {
    loadCSVData();
});

function loadCSVData() {
    const csvFilePath = 'valordolarhistorico.csv';
    fetch(csvFilePath)
        .then((response) => response.text())
        .then((csvText) => {
            const data = parseCSV(csvText);
            if (data.length > 0) {
                displayTable(data);
                displayMonthlyStatistics(data);
            } else {
                alert(
                    'No se pudo cargar el archivo CSV. Se generarán datos aleatorios.'
                );
                const randomData = generateRandomData(100);
                displayTable(randomData);
                displayMonthlyStatistics(randomData);
            }
        })
        .catch((error) => {
            alert(
                'No se pudo cargar el archivo CSV. Se generarán datos aleatorios.'
            );
            const randomData = generateRandomData(100);
            displayTable(randomData);
            displayMonthlyStatistics(randomData);
        });
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    return lines.slice(1).map((line) => {
        const [Fecha, Precio] = line.split(',');
        return {
            Fecha,
            Precio: parseFloat(Precio),
        };
    });
}

function displayTable(data) {
    // Reinitialize DataTable if it already exists
    if ($.fn.DataTable.isDataTable('#dollar-values')) {
        $('#dollar-values').DataTable().clear().destroy();
    }

    $('#dollar-values').DataTable({
        data: data.map((row) => [row.Fecha, row.Precio]),
        columns: [{title: 'Fecha'}, {title: 'Precio'}],
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
    });
}

function displayMonthlyStatistics(data) {
    const monthlyData = {};

    data.forEach((row) => {
        const month = row.Fecha.substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) {
            monthlyData[month] = [];
        }
        monthlyData[month].push(row.Precio);
    });

    const monthlyAverages = Object.keys(monthlyData).map((month) => {
        const values = monthlyData[month];
        const average = (
            values.reduce((sum, value) => sum + value, 0) / values.length
        ).toFixed(2);
        return {month, average};
    });

    // Reinitialize DataTable if it already exists
    if ($.fn.DataTable.isDataTable('#monthly-statistics')) {
        $('#monthly-statistics').DataTable().clear().destroy();
    }

    $('#monthly-statistics').DataTable({
        data: monthlyAverages.map((item) => [item.month, item.average]),
        columns: [{title: 'Mes'}, {title: 'Promedio Mensual'}],
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
    });
}

function generateRandomData(num) {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - num);

    for (let i = 0; i < num; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = date.toISOString().split('T')[0];
        const randomValue = (Math.random() * 100 + 50).toFixed(2); // Random values between 50 and 150
        data.push({Fecha: formattedDate, Precio: parseFloat(randomValue)});
    }

    return data;
}
