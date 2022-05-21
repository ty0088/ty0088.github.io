async function getCurrentWeather(city) {
    try {
        document.getElementById('loadingIcon').classList.toggle('none');
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=89b10e1c46b43bcadf4622579b2a2ba9&units=metric`, {mode: 'cors'});
        if (response.ok) {
            const weatherData = await response.json();
            document.getElementById('searchInput').value = ''; //clear input field  if successful response
            updateDOM(weatherData);
        } else {
            console.log(response.status);
            if (response.status === 404) { //if city name is not found, print error to DOM
                warning404();
            }
        }
        document.getElementById('loadingIcon').classList.toggle('none');
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

    const cityLocalTime = localCityTime(data.dt, data.timezone);
    timeDiv.innerText = cityLocalTime;

    const iconCode = data.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconDiv.src = iconURL;
    const weatherDescr = data.weather[0].description;
    iconDiv.setAttribute('alt', weatherDescr);
    
    descr.innerText = weatherDescr;

    infoDiv.innerHTML = '';

    const addInfoHTMLDiv =  document.createElement('div');
    const feelSpan = document.createElement('span');
    feelSpan.innerText = `feels like: ${roundToHalf(data.main.feels_like)}°C`;
    addInfoHTMLDiv.appendChild(feelSpan);
    const maxTempSpan = document.createElement('span');
    maxTempSpan.innerText = `max temp: ${roundToHalf(data.main.temp_max)}°C`;
    addInfoHTMLDiv.appendChild(maxTempSpan);
    const minTempSpan = document.createElement('span');
    minTempSpan.innerText = `min temp: ${roundToHalf(data.main.temp_min)}°C`;
    addInfoHTMLDiv.appendChild(minTempSpan);
    const pressureSpan = document.createElement('span');
    pressureSpan.innerText = `Pressure: ${data.main.pressure}hPa`;
    addInfoHTMLDiv.appendChild(pressureSpan);
    const humidSpan = document.createElement('span');
    humidSpan.innerText = `Humidity: ${data.main.humidity}%`;
    addInfoHTMLDiv.appendChild(humidSpan);
    infoDiv.appendChild(addInfoHTMLDiv);
}

function roundToHalf(temp) {
    return Math.round(temp*2)/2;
}

function localCityTime(dt, timezone) {
    const currDate = new Date();
    const currOffset = currDate.getTimezoneOffset() * 60; //get user timezone offset to UTC in seconds
    const localTimeSec = dt + currOffset + timezone; //user time + local timezone UTC offset + UTC to city timezone offset
    const localDate = new Date(localTimeSec * 1000);
    const hrInt = localDate.getHours();
    let hrStr = hrInt.toString();
    if (hrInt < 10) {
        hrStr = '0' + hrStr; 
    }
    const minInt = localDate.getMinutes();
    let minStr = minInt.toString();
    if (minInt < 10) {
        minStr = '0' + minStr; 
    }
    return `${hrStr}:${minStr} local time`
};


searchListeners();
getLocalWeather();