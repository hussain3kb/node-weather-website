import forecast from "./forecast.js";
const mapBox_API_Key = `pk.eyJ1IjoiaHVzc2FpbjNrYiIsImEiOiJjbGVmN3I3OXQwMHl3M3dvYnA5MHZwbGx5In0.14pW2kTB7VJPtA9wSyYOjA`;

const geoCode = async (cityName) => {
  const mapBox_API = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?limit=1&access_token=${mapBox_API_Key}`;
  const res = await fetch(mapBox_API);
  const data = await res.json();

  if (!data.features) console.log(data.message);
  else {
    const lat = data.features[0].center[0];
    const lon = data.features[0].center[1];
    const placeName = data.features[0].place_name;
    console.log(lat, lon, placeName);
    const dataObj = await forecast(lon, lat);
    return dataObj;
  }
};

export default geoCode;
