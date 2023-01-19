import React, {useState, useEffect} from "react";

// to get weather report
// https://openweathermap.org/current


// to convert city names to coordinates
// https://openweathermap.org/api/geocoding-api

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



export default function Weather({userData, setUserData}) {

    const api_keys = {
        openedWeatherMap: "b3f5fab1dae2062b7cd950a48a936e79",
        ipToLocation: "3K7hAsyNM17mPQf6SuYWr9B6KY8kY6f0"
    }
    
    const [weather, setWeather] = useState({
    
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
    useEffect(() => {
    
        if (/\d+(\.\d+){3}/.test(userData.user_ip)) {
            fetch(`https://api.apilayer.com/ip_to_location/${userData.user_ip}`, {
                method: "GET",
                headers: {
                    "apikey": api_keys.ipToLocation
                }
            }).
            then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                else {
                    setUserData(prevData => ({
                        ...prevData,
                        errors: [...prevData.errors, "location by ip"]
                    }))
                }
            }).
            then(data => {
                setLocationData(prevData => ({
                    ...prevData,
                    country_name: data.country_name,
                    country_code: data.country_code,
                    city_name: data.city,
                    latitude: data.latitude,
                    longitude: data.longitude,
                }))
            })
        }

    }, [userData.user_ip])



    return (
        <div className="weather__container">

        </div>
    )
}