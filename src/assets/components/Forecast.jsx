import React, {useState, useEffect} from "react";
import "../css/Forecast.css"


export default function Forecast({api_keys, userData, setUserData, setOpenedTab}) {

    const [forecastData, setForecastData] = useState()
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
            {
                forecastData &&
                Object.keys(forecastData).map(key => {
                    return <ForecastDay 
                        key={key}
                        userData={userData}
                        daysDate={key}
                        forecastData={forecastData}
                    />
                })
            }
        </div>
    )
}

function ForecastDay({userData, daysDate, forecastData}) {
    const [description, setDescription] = useState(null)
    const data = forecastData[daysDate][0]
    //console.log(forecastData)
    //console.log(data)
    
    return (
        <div className="forecast__day">
            <div className="forecast__day_title">{daysDate}</div>
            <div className="forecast__row">
                {
                    data.map(item => {
                        return <ForecastItem
                            key={item.dt}
                            userData={userData}
                            time={item.dt_txt.split(" ")[1].slice(0, 2)}
                            icon={item.weather[0].icon}
                            temp={item.main.temp}
                            description={item.weather[0].description}
                            setDescription={setDescription}
                        />
                    })
                }
            </div>
            <p className="forecast__desciption">{description && description}</p>
        </div>
    )
}

function ForecastItem({userData, time, icon, temp, setDescription, description}) {

    return (
        <div 
            className="forecast__item"
            data-description={description}
            onMouseOver={(event) => { setDescription(event.target.dataset.description) }}
            onMouseOut={() => { setDescription(null)}}
        >
            <p className="forecast__time">{time} h.</p>
            <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt="forecast_icon" 
                className="forecast__icon"
            />
 
            <p className="forecast__temp">{temp} {userData.units === "metric" ? " °C" : " °F"}</p>
        </div>
    )
}