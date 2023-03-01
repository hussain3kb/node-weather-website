const weather_API_Key = "ae268a87b9bb79d78faaaa848455074f";
const weather_API = `http://api.weatherstack.com/current?access_key=${weather_API_Key}&query=`;

const forecast = async (cityName) => {
  const res = await fetch(`${weather_API}${cityName}`);
  const data = await res.json();

  if (data.error) return data;
  else {
    console.log(
      `${data.location.country}: It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`
    );
    return data;
  }
};

export default forecast;
