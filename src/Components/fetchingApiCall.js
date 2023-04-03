const makeIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getformattedData = async (units = "metric") => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=saudi&appid=9184a751e8fee20ac3cf15d5ed1e1869&units=${units}`;
  const data = await fetch(api)
    .then((res) => res.json())
    .then((data) => data);
  const {
    weather,
    main: { temp, feels_like, pressure, humidity, temp_min, temp_max },
    wind: { speed },
    sys: { country },
    name,
    visibility,
  } = data;
  const { description, icon } = weather[0];

  return {
    description,
    iconUrl: makeIconUrl(icon),
    temp,
    temp_max,
    temp_min,
    pressure,
    humidity,
    feels_like,
    speed,
    country,
    name,
    visibility,
  };
};
export { getformattedData };
