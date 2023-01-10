import axios from "axios";
import { useState, useEffect } from "react";
// import Weather from "./Weather";

const Maa = ({ maa }) => {
  const key = "0771dc1ca9dab7ca382da4d53535bdb5";
  const [saa, setSaa] = useState([]);

  console.log(maa.latlng[0]);
  var lat = maa.latlng[0];
  var lng = maa.latlng[1];

  // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  //  "https://api.openweathermap.org/data/2.5/weather?q=Yaren&units=metric&appid=0771dc1ca9dab7ca382da4d53535bdb5"
  //  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API key}`
  var url = new URL(
    `https://api.openweathermap.org/data/2.5/weather?q=${maa.capital}&units=metric&appid=0771dc1ca9dab7ca382da4d53535bdb5`
  );
  url.searchParams.set("X", maa.capital);
  console.log("url on", url);

  const hook = () => {
    axios
      .get(url.href)
      .then((response) => {
        console.log("answer" + response.data);
                console.log(
                  `Current temperature in ${response.data.location} is ${response.data.current}℃`
                );
        setSaa([response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(hook, []);
  // console.log("sää", saa[0]);
  // console.log(saa[0].weather[0]);

  if (saa.length > 0) {
    const currentWeather = saa[0];
    console.log("sää", saa[0].main.temp);
    console.log("sää oikeest", saa[0]);
    return (
      <div>
        <h1>{maa.name.common}</h1>
        <p>capital: {maa.capital}</p>
        <p>population: {maa.population}</p>
        <h2>Spoken languages</h2>
        <img src={maa.flags.png} alt="Country flag"></img>
        <h2>Weather in {maa.capital}</h2>
        <p>temperature: {currentWeather.main.temp}° Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        ></img>
      </div>
    );
  }

  return (
    <div>
      <h2>{maa.name.common}</h2>
      <p>
        capital {maa.capital} <br></br> area {maa.area}
      </p>
      <h4>languages:</h4>

      <img src={maa.flags.png} alt="alt"></img>

      <h2>Weather in {maa.capital}</h2>
    </div>
  );
};

export default Maa;
