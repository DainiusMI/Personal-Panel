import React, {useState, useEffect} from "react";

// weather reports from
// https://openweathermap.org/




export default function NavbarWeather({userData, setUserData}) {



    console.log(new Date(1674669600))
    


    const [todaysForecast, setTodaysForecast] = useState()
    

    const [weather, setWeather] = useState({
        current_temp: "",
        humidity: "",
        precipitation: "none",
        wind_speed: "",
        wind_gust: "",
        wind_direction: ""
    })
    const [locationData, setLocationData] = useState({
        country_name: "",
        country_code: "",
        city_name: "",
        zip_code: "",
        latitude: "",
        longitude: "",
        manual_set: false,
    })
    /*
        curl --location --request \
        GET 'https://api.apilayer.com/ip_to_location/182.48.79.85' \
        --header 'apikey: YOUR API KEY'
    */


    

    return (
        <div className="weather__container">

        </div>
    )
}