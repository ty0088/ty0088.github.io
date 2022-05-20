async function getCurrentWeather(city) {
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
            document.getElementById('searchInput').value = ''; //clear input field  if successful response
        } else {
            console.log(response.status);
            if (response.status === 404) {
                warning404();
            }
        }
    } catch(err) {
        console.log(err);
    }
}

async function getLocationbyIP() {
    try {
        const response = await fetch('https://ipapi.co/json/', {mode: 'cors'});
        if (response.ok) {
            const locationData = await response.json();
            return locationData.city;
        } else {
            return "London"; //return location as London if response not successful
        }
    } catch(err) {
        console.log(err);
        return "London"; //return location as London if error in fetching response
    }
}

async function getLocalWeather() { //get current weather based on location from user IP
    try {
        const city = await getLocationbyIP();
        console.log(city)
        getCurrentWeather(city);
    } catch(err) {
        console.log(err)
    }
}

function searchListeners() {
    document.getElementById('searchBtn').addEventListener('click', checkInput);
    document.getElementById('searchInput').addEventListener('keyup', (event) => {
        event.target.setCustomValidity('');
        document.getElementById('searchWarning').innerText = '';
        if (event.key === 'Enter') {
            checkInput();
        }
    });
}

function checkInput() {
    document.getElementById('searchWarning').innerText = '';
    const input = document.getElementById('searchInput');
    input.setCustomValidity('');
    if (input.checkValidity()) {
        getCurrentWeather(input.value);
    } else if (input.validity.valueMissing) {
        input.setCustomValidity('Please enter a city name');
    } else if (input.validity.patternMismatch) {
        input.setCustomValidity('Please enter a valid city name or a valid city name and country code separated by a comma i.e. London, GB');
    }
    input.reportValidity();
}

function warning404() {
    document.getElementById('searchWarning').innerText = '*Cannot find city name'
}


searchListeners();
getLocalWeather();