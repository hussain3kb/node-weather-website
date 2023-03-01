const weatherForm = document.querySelector("form");
const input = document.querySelector("form input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const apiKey = "e000cf8a9da4260c16a33940fb47f274";

const forecast = async (cityName) => {
  messageOne.textContent = `Loading for ${cityName}`;
  messageTwo.textContent = "";
  const geoLocationAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  const res = await fetch(geoLocationAPI);
  const data = await res.json();
  console.log(data);
  if (data.message || data.length == 0)
    return (messageOne.textContent = `ERROR: ${data.message}`);

  const { name, state, country } = data[0];
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=en&appid=${apiKey}&units=metric`;
  const weatherRes = await fetch(weatherAPI);
  const weatherData = await weatherRes.json();
  if (!weatherData.weather) {
    messageOne.textContent = "ERROR:";
    return (messageTwo.textContent = weatherData.message);
  }

  const weatherInfo = `It's currently ${weatherData.main.temp} deg in ${name}, ${state}, ${country}. And feel's like ${weatherData.weather[0].description}.`;
  messageTwo.textContent = weatherInfo;
  messageOne.textContent = "Success:";
  console.log(weatherData);
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value)
    return (messageOne.textContent = `Please provide an address.`);
  const location = input.value;
  input.value = "";
  forecast(location);
});
