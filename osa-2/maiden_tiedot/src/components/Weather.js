import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ country }) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

    const hook = () => {
        axios.get(url)
            .then(response => {
                setWeather(response.data);
            })
    }

    useEffect(hook, [])

    if (weather.length === 0) {
        return (
            <div>
                <p>Weather loading...</p>
            </div>
        )
    }
    else {
        try {
            return (
                <div>
                    <p><b>Tempature:</b> {weather.current.temperature} Celcius</p>
                    <img src={weather.current.weather_icons} alt="Weather icon" width="100px" />
                    <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
                </div>
            )
        } catch {
            return (
                <div>
                    <p>Error loading Weather</p>
                </div>
            )
        }

    }

}

export default Weather;