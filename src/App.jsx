import React, { useEffect, useState } from "react";
import { AiTwotoneCloud, AiFillMail } from "react-icons/ai";
import {
  BsFillCloudDrizzleFill,
  BsFillCloudLightningRainFill,
  BsFillCloudSunFill,
  BsFillMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";
import "./App.css";

const API = {
  key: "eb4982cbdb9df82b8fac90f8b0505d7d",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [color, setColor] = useState("rgba(255,255,255,0.5)");
  const [weather, setWeather] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState(BsSunFill);
  const [text, setText] = useState("");

  // make request to openweathermap API with axios
  const getWeather = async (e) => {
    const api_call = await fetch(
      `${API.base}weather?q=sao paulo,br&units=metric&APPID=${API.key}`
    );
    const data = await api_call.json();

    // set weather icon
    setWeatherIcon(
      data.weather[0].main === "Clouds"
        ? BsFillCloudDrizzleFill
        : data.weather[0].main === "Rain"
        ? BsFillCloudLightningRainFill
        : data.weather[0].main === "Clear"
        ? // if weather is clear, check the time of day then set weather icon
          new Date().getHours() > 6 && new Date().getHours() < 18
          ? BsSunFill
          : BsFillMoonStarsFill
        : BsFillCloudSunFill
    );

    setWeather(Math.round(data.main.temp));
  };

  //get bitcoin price with axios
  const getBitcoin = async () => {
    const api_call = await fetch(
      `https://api.coindesk.com/v1/bpi/currentprice.json`
    );
    const data = await api_call.json();
    setText(data.bpi.USD.rate);
  };

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  // execute getWeather just once
  useEffect(() => {
    getWeather();
    getBitcoin();
  }, []);

  //return current date
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}.${month}.${year}`;
    return currentDate;
  };

  //return week day
  const getWeekDay = () => {
    const date = new Date();
    const weekDay = date.getDay();
    const weekDayName = [
      "DOMINGO",
      "SEGUNDA-FEIRA",
      "TERÇA-FEIRA",
      "QUARTA-FEIRA",
      "QUINTA-FEIRA",
      "SEXTA-FEIRA",
      "SÁBADO",
    ];
    const currentWeekDay = weekDayName[weekDay];
    return currentWeekDay;
  };

  // on click change text color if is first time
  const changeColor = () => {
    if (color === "rgba(255,255,255,0.5)") {
      setColor("rgba(0,0,0,0.5)");
    } else {
      setColor("rgba(255,255,255,0.5)");
    }
  };

  return (
    <>
      <div className="main_section">
        <div className="previsao">
          <div className="icon" onClick={changeColor} style={{ color: color }}>
            {weatherIcon}
            <h4>{weather}°</h4>
          </div>

          <div className="mail" style={{ color: color }}>
            <h4>BTC: ${text.substring(0, 6)}</h4>
          </div>
        </div>
        <div className="relogio">
          <div
            className="hora"
            id="hora"
            onClick={changeColor}
            style={{ color: color }}
          >
            <h1>{time}</h1>
          </div>

          <div className="dia" onClick={changeColor} style={{ color: color }}>
            <h4>{getCurrentDate()}</h4>
            <h4>{getWeekDay()}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
