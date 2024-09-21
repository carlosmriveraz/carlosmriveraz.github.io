function fetchApiValue() {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const usdToCopRate = data.rates.COP;
            document.getElementById('api-value').textContent =
                usdToCopRate.toFixed(2);
        })
        .catch((error) => {
            console.error('Error fetching API:', error);
        });
}
