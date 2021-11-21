
let apiKey="18f68700369f5317f6cbee485851bf9b";
let url=`https://api.openweathermap.org/data/2.5/find?q=New York City&units=imperial&appid=${apiKey}`;

axios.get(url).then(displayTemperature);

function displayTemperature(response){
    console.log(response);
    let weatherDescription = document.querySelector("#description");
    let cityName = document.querySelector("#city");
    let temperature = document.querySelector("#current-temperature");
    let humidityCondition = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let feelsLike = document.querySelector("#feels-like");

    weatherDescription.innerHTML = response.data.list[0].weather[0].description;
    cityName.innerHTML = response.data.list[0].name;
    temperature.innerHTML = Math.round(response.data.list[0].main.temp);
    humidityCondition.innerHTML = response.data.list[0].main.humidity;
    windSpeed.innerHTML = Math.round(response.data.list[0].wind.speed);
    feelsLike.innerHTML = Math.round(response.data.list[0].main.feels_like);
}