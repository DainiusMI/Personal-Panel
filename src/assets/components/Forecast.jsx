import React, {useState, useEffect} from "react";


export default function Forecast({api_keys, userData, setUserData, setOpenedTab}) {

    const [forecastData, setForecastData] = useState()
    const days = 5
    
    const [year, month, today] = [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
    ]
    function sortForecast(data) {
        
    }
    useEffect(() => {
        if (userData.latitude === undefined || userData.longitude === undefined) {
            return
        }
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userData.longitude}&lon=${userData.longitude}&appid=${api_keys.openedWeatherMap}&units=${userData.units}`).
            then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                else {
                    setUserData(prevData => ({
                        ...prevData,
                        errors: [...prevData.errors, `forecast failed`]
                    }))
                }
            }).
            then(data => {
                console.log(data)
            })
        
    }, [userData.latitude, userData.longitude, userData.units])
    return (
        <div className="forecast">
            forecast
        </div>
    )
}