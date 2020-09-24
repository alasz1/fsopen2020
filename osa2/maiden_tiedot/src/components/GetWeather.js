import React, { useEffect } from 'react'
import axios from 'axios'

const GetWeather = (props) => {

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${props.api_key}&query=${props.capital}`)
      .then(response => {
        props.setWeather(response.data.current)
        console.log(response.data.current.temperature)
      })
  }, [])

  return (
    <div>
      <p>Temperature: {props.weather.temperature}</p>
      <img src={props.weather.weather_icons} alt="weather"/>
      <p>Wind: {props.weather.wind_speed} km/h {props.weather.wind_dir}</p>
    </div>
  );
};

export default GetWeather;