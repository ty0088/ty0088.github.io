async function getCurrentWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89b10e1c46b43bcadf4622579b2a2ba9&units=metric`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            document.getElementById('searchInput').value = ''; //clear input field  if successful response
            updateDOM(weatherData);
            console.log(weatherData);
        } else {
            console.log(response.status);
            if (response.status === 404) { //if city name is not found, print error to DOM
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
    document.getElementById('searchWarning').innerText = '*Cannot find city name';
}

function updateDOM(data) {
    const locationDiv = document.getElementById('location');
    const timeDiv = document.getElementById('time');
    const tempDiv = document.getElementById('temp');
    const iconDiv = document.getElementById('icon');
    const descr = document.getElementById('description');
    const infoDiv = document.getElementById('info');

    locationDiv.innerText = data.name + ', ' + data.sys.country;
    tempDiv.innerText = roundToHalf(data.main.temp) + '°C';

    const date = new Date(data.dt * 1000);
    const hr = date.getHours();
    const min = date.getMinutes();
    timeDiv.innerText = `${hr}hrs${min}mins`;  //change this to location local time

    const iconCode = data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconDiv.src = iconURL;
    const weatherDescr = data.weather[0].description;
    iconDiv.setAttribute('alt', weatherDescr);
    
    descr.innerText = weatherDescr;

    infoDiv.innerHTML = '';
    const addInfoHTML = `<div>
                            <span>feels like: ${roundToHalf(data.main.feels_like)}°C</span>
                            <span>max temp: ${roundToHalf(data.main.temp_max)}°C</span>
                            <span>min temp: ${roundToHalf(data.main.temp_min)}°C</span>
                            <span>Pressure: ${data.main.pressure}hPa</span>
                            <span>Humidity: ${data.main.humidity}%</span>
                        </div>`;
    infoDiv.insertAdjacentHTML("beforeend", addInfoHTML);

}

function roundToHalf(temp) {
    return Math.round(temp*2)/2;
}

function localTime(data) {
    //function to workout local time
};


searchListeners();
getLocalWeather();