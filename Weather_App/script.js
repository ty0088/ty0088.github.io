async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89b10e1c46b43bcadf4622579b2a2ba9&units=metric`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
            console.log(weatherData.main.temp + '°C');
            const date = new Date(weatherData.dt * 1000);
            const hours = date.getHours();
            const minute = date.getMinutes();
            console.log(hours + 'hrs' + minute + 'mins');
        } else {
            console.log(response.status);
        }
    } catch(err) {
        console.log(err);
    }
}

async function get5DayWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=89b10e1c46b43bcadf4622579b2a2ba9&units=metric`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
        } else {
            console.log(response.status);
        }
    } catch(err) {
        console.log(err);
    }
}

async function getLocationbyIP() {
    try {
        const response = await fetch('https://ipapi.co/json/', {mode: 'cors'});
        const locationData = await response.json();
        console.log(locationData.city);
        return locationData.city;
    } catch(err) {
        console.log(err);
    }
}

async function getLocalWeather() {
    try {
        const city = await getLocationbyIP();
        getWeather(city);
    } catch(err) {
        console.log(err)
    }
}

getLocalWeather();