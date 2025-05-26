async function fetchWeatherData() {
    try {
        const lon = 18.05368; // Longitude for Stockholm
        const lat = 59.32243; // Latitude for Stockholm
        const apiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        // Extract relevant data (adjust based on SMHI API structure)
        const temperature = data.timeSeries[0].parameters.find(p => p.name === 't').values[0];
        const wind = data.timeSeries[0].parameters.find(p => p.name === 'ws').values[0];
        const pressure = data.timeSeries[0].parameters.find(p => p.name === 'msl').values[0];

        // Display data on the webpage
        document.getElementById('weather').innerHTML = `
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${wind} m/s</p>
            <p><strong>Pressure:</strong> ${pressure} hPa</p>
        `;
    } catch (error) {
        document.getElementById('weather').textContent = 'Error loading weather data.';
        console.error(error);
    }
}