import {useEffect, useState} from "react"
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import Loading from "./loading"

import styles from "./weatherApp.module.css";

export default function WeatherApp () {
    const [weather, setWeather] = useState(null)

    useEffect(() =>{
        loadInfo();
    }, []);

    useEffect(() =>{
        document.title = `Weather / ${weather?.location.name ?? ""}`;
    }, [weather])

    async function loadInfo(city = 'Cali'){
        try {
            const request = await fetch(
                `http://api.weatherapi.com/v1/current.json?aqi=no&key=5e98898b2f1f427aa0d21358222110&q=${city}`
            );
            const json = await request.json();

            setTimeout(() => {
                setWeather(json)
            },2000)

        } catch (error) {
        }
    }


    function handleChangecity (city) {
        setWeather(null, city)
        loadInfo(city)
    }


    return (
    <div className={styles.weatherContainer}>
        <WeatherForm  onChangeCity={handleChangecity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>)
}

