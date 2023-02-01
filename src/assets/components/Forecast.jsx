import React, {useState, useEffect} from "react";


export default function Forecast({api_keys, userData, setUserData, setOpenedTab}) {

    const [forecastData, setForecastData] = useState()
    console.log(forecastData)
    const [year, month, today] = [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    ]
    function sortForecast(list) {
        let target_dt = ""
        let daysForecast = []
        let allDays = {}
        list.map(data => {
            if (target_dt === data.dt_txt.split(" ")[0]) {
                daysForecast.push(data)
            }
            else {
                if (daysForecast.length > 0) {
                    allDays[target_dt] = [daysForecast]
                }
                target_dt = data.dt_txt.split(" ")[0]
                daysForecast = []
            }
        })
        setForecastData(allDays)
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
                sortForecast(data.list)
            })
        
    }, [userData.latitude, userData.longitude, userData.units])
    return (
        <div className="forecast">
            forecast
        </div>
    )
}