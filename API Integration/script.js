const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const weatherIcon = document.querySelector("#weatherIcon");

const message = document.querySelector("#message");
const forecastContainer = document.querySelector("#forecast");

// Weather codes from Open-Meteo
function getWeatherInfo(code) {

    if (code === 0)
        return {
            text: "Clear Sky",
            icon: "fa-sun"
        };

    if ([1, 2, 3].includes(code))
        return {
            text: "Partly Cloudy",
            icon: "fa-cloud-sun"
        };

    if ([45, 48].includes(code))
        return {
            text: "Fog",
            icon: "fa-smog"
        };

    if ([51,53,55,56,57].includes(code))
        return {
            text: "Drizzle",
            icon: "fa-cloud-rain"
        };

    if ([61,63,65,66,67].includes(code))
        return {
            text: "Rain",
            icon: "fa-cloud-showers-heavy"
        };

    if ([71,73,75,77].includes(code))
        return {
            text: "Snow",
            icon: "fa-snowflake"
        };

    if ([80,81,82].includes(code))
        return {
            text: "Rain Showers",
            icon: "fa-cloud-showers-heavy"
        };

    if ([95,96,99].includes(code))
        return {
            text: "Thunderstorm",
            icon: "fa-bolt"
        };

    return {
        text: "Unknown",
        icon: "fa-cloud"
    };

}

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        message.textContent = "Please enter a city name.";
        message.className = "error";
        return;

    }

    try {

        message.textContent = "Loading weather...";
        message.className = "loading";

        forecastContainer.textContent = "";

        // STEP 1 - Find city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        if (!geoResponse.ok)
            throw new Error();

        const geoData = await geoResponse.json();

        if (!geoData.results)
            throw new Error();

        const location = geoData.results[0];

        // STEP 2 - Fetch weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=auto`
        );

        if (!weatherResponse.ok)
            throw new Error();

        const data = await weatherResponse.json();

        cityName.textContent = location.name;

        temperature.textContent =
            data.current.temperature_2m + "°C";

        const currentWeather =
            getWeatherInfo(data.current.weather_code);

        condition.textContent =
            currentWeather.text;

        weatherIcon.className =
            `fas ${currentWeather.icon} weather-icon`;

        // Forecast
        forecastContainer.textContent = "";

        for (let i = 0; i < 3; i++) {

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            const day = document.createElement("h3");

            day.textContent = new Date(
                data.daily.time[i]
            ).toLocaleDateString("en-US", {
                weekday: "short"
            });

            const icon = document.createElement("i");

            const info = getWeatherInfo(
                data.daily.weather_code[i]
            );

            icon.className = `fas ${info.icon}`;

            const temp = document.createElement("p");

            temp.textContent =
                `${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°`;

            const text = document.createElement("p");

            text.textContent = info.text;

            card.appendChild(day);
            card.appendChild(icon);
            card.appendChild(temp);
            card.appendChild(text);

            forecastContainer.appendChild(card);

        }

        message.textContent = "";

    }

    catch (error) {

        message.textContent =
            "Unable to fetch weather. Please check the city name and try again.";

        message.className = "error";

    }

}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        getWeather();

    }

});