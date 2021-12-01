
function getForecast(coordinates) {
    let apiKey="18f68700369f5317f6cbee485851bf9b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let weatherDescription = document.querySelector("#weather-description");
    let cityName = document.querySelector("#city");
    let temperature = document.querySelector("#current-temperature");
    let humidityCondition = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let feelsLike = document.querySelector("#feels-like");
    let date = document.querySelector("#current-date");
    let icon = document.querySelector("#weather-icon");
    let iconImage = response.data.list[0].weather[0].icon;

    
    //global variables because they are used in the metric and imperial functions
    fahrenheitTemperature = response.data.list[0].main.temp;

    feels = response.data.list[0].main.feels_like;

    wind = response.data.list[0].wind.speed;

     // remove active class from celsius link
     celsiusLink.classList.remove("active");
     // add active class to fahrenheot link
     fahrenheitLink.classList.add("active");
    

    weatherDescription.innerHTML = response.data.list[0].weather[0].description;
    cityName.innerHTML = response.data.list[0].name;
    temperature.innerHTML = Math.round(fahrenheitTemperature);
    humidityCondition.innerHTML = response.data.list[0].main.humidity;
    windSpeed.innerHTML = ` ${Math.round(wind)} mph`;
    feelsLike.innerHTML = Math.round(feels);
    date.innerHTML = formatDate(response.data.list[0].dt * 1000);
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`);

    getForecast(response.data.list[0].coord);
}

function displayForecast(response) {
    let forecast = document.querySelector("#weather-forecast");
    let dailyForecast = (response.data.daily);

    console.log(response.data.daily);
    
    //create a variable for forecast
    let forecastHTML = `<div class="row">`;

    //for loop to get forecast per day 
    dailyForecast.forEach(function(days, index) {
        // define the variable; new forcastHTML to old data
        if (index < 6) {
            forecastHTML = forecastHTML + 
            `
                <div class="col-2">
                    <div class="day">
                        ${formatForecastDay(days.dt)}
                    </div>
                    <img class="icons" src="http://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png" id="forecast-icon">
                    
                    <div class="forecast-temperatures">
                        <span class="high">${Math.round(days.temp.max)}°</span>
                        <span class="low">${Math.round(days.temp.min)}°</span>
                    </div>
                </div>
            `; 
        }
    }) 
    

    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML; 
}

function formatForecastDay(timestamp){
    let date = new Date(timestamp * 1000);

    let day = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

    day = day[date.getDay()];

    return day;
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    day = day[date.getDay()];
    

    if (hours < 10){
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hours}:${minutes}`;
 
}


function search(city) {
    let apiKey="18f68700369f5317f6cbee485851bf9b";
    let url=`https://api.openweathermap.org/data/2.5/find?q=${city}&units=imperial&appid=${apiKey}`;

    axios.get(url).then(displayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
function toMetric(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
    let feelsLike = document.querySelector("#feels-like");
    let feelsLikeCelsius = (feels - 32) * 5/9;
    let windSpeed = document.querySelector("#wind");
    let windMetric = wind * 1.609;
    

    //remove active class from fahrenheit link
    fahrenheitLink.classList.remove("active");
    // add active class to celsius link
    celsiusLink.classList.add("active");

    temperature.innerHTML = Math.round(celsiusTemperature);

    feelsLike.innerHTML = Math.round(feelsLikeCelsius);

    windSpeed.innerHTML = `${Math.round(windMetric)} kmh`;
}

function toImperial(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    let feelsLike = document.querySelector("#feels-like");
    let windSpeed = document.querySelector("#wind");

    // remove active class from celsius link
    celsiusLink.classList.remove("active");
    // add active class to fahrenheot link
    fahrenheitLink.classList.add("active");

    temperature.innerHTML = Math.round(fahrenheitTemperature);

    feelsLike.innerHTML = Math.round(feels);
    
    windSpeed.innerHTML = `${Math.round(wind)} mph`;
}

let fahrenheitTemperature = null;

let feels = null;

let wind = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", toMetric);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", toImperial);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Paris");
