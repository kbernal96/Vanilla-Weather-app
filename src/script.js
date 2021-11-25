
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

    weatherDescription.innerHTML = response.data.list[0].weather[0].description;
    cityName.innerHTML = response.data.list[0].name;
    temperature.innerHTML = Math.round(response.data.list[0].main.temp);
    humidityCondition.innerHTML = response.data.list[0].main.humidity;
    windSpeed.innerHTML = Math.round(response.data.list[0].wind.speed);
    feelsLike.innerHTML = Math.round(response.data.list[0].main.feels_like);
    date.innerHTML = formatDate(response.data.list[0].dt * 1000);
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconImage}@2x.png`);
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday0", "Saturday"];

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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Paris");