async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89b10e1c46b43bcadf4622579b2a2ba9&units=metric`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
            console.log(weatherData.main.temp + '°C');
        } else {
            console.log(response.status);
        }
    } catch(err) {
        console.log(err);
    }
}

getWeather('London');