import React, {useState, useEffect} from "react";
import NavbarWeather from "./NavbarWeather";



export default function Navbar({api_keys, userData, setUserData}) {

    const [gadgetState, setGadgetState] = useState({hovered: null})

    const [currentWeather, setCurrentWeather] = useState({})
    //future feature
    const [currentAlerts, setCurrentAlerts] = useState({
        wind_speed: "data.wind.speed",
        wind_gust: "data.wind.gust",
        rain: "data.rain.1h",
        snow: "data.snow.1h"
    })

    useEffect(() => {
        if (userData.latitude === undefined || userData.longitude === undefined) {
            return
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userData.latitude}&lon=${userData.longitude}&appid=${api_keys.openedWeatherMap}&units=${userData.units}`).
            then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                else {
                    setUserData(prevData => ({
                        ...prevData,
                        errors: [...prevData.errors, "current weather failed"]
                    }))
                }
        }).
        then(data => {
            setCurrentWeather({
                icon: data.weather[0].icon,
                description: data.weather[0].description,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
            })
        })
    }, [userData.latitude, userData.longitude])


    const handleMouseOver = (event) => { setGadgetState({hovered: event.target.id}) }
    const handleMouseOut = () => { setGadgetState({hovered: null}) }

    function switchExtras() {
        switch (gadgetState.hovered) {
            case null: 
                break;
            case "gadget__temp": 
                return <FeelsLike currentWeather={currentWeather} userData={userData}/>
            case "gadget__icon":
                return <WeatherDescription currentWeather={currentWeather} />
            
        }
    }
    return (
        <nav id="navbar"
        >
            
            <div className="weather__gadget">

                <div className="gadget__main">
                    <p 
                        id="gadget__temp" 
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >{currentWeather.temp} <span>{userData.units === "metric" ? " °C" : " °F"}</span></p>
                    <p 
                        id="gadget__city" 
                    >@ {userData.city_name}</p>
                    {
                        currentWeather.icon &&
                        <img 
                            id="gadget__icon" 
                            src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`} 
                            alt="gadget_icon" 
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        />
                    }
                </div>
                {
                    switchExtras()
                }
            </div>

        </nav>
    )
}

function FeelsLike({currentWeather, userData}) {
    return (
        <div className="gadget__extra weather">
            <p className="gadget__extra__text">Feels like {currentWeather.feels_like} <span>{userData.units === "metric" ? " °C" : " °F"}</span></p>
        </div>
    )
}

function WeatherDescription({currentWeather}) {
    return (
        <div className="gadget__extra weather">
            <p className="gadget__extra__text">{currentWeather.description}</p>
        </div>
    )
}