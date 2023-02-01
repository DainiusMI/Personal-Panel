import React, {useState, useEffect} from "react";

import "../css/Navbar.css"


export default function Navbar({api_keys, userData, setUserData, openedTab, handleOpenedTab}) {

    const [gadgetState, setGadgetState] = useState({hovered: null})

    const [currentWeather, setCurrentWeather] = useState({})
    //future feature
    const [currentAlerts, setCurrentAlerts] = useState({
        wind_speed: "",
        wind_gust: "",
        rain: "",
        snow: ""
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
            setCurrentAlerts({
                wind_speed: data.wind.speed,
                wind_gust: data.wind.gust,
                rain: data.rain !== undefined ? data.rain["1h"] : "none",
                snow: data.snow !== undefined ? data.snow["1h"] : "none"
            })
        })
    }, [userData.latitude, userData.longitude, userData.units])

    const handleMouseOver = (event) => { setGadgetState({hovered: event.target.id}) }
    const handleMouseOut = () => { setGadgetState({hovered: null}) }

    function switchExtras() {
        switch (gadgetState.hovered) {
            case null: 
                break;
            case "expand__forecast": 
                return <ExpandForecast />
            case "gadget__temp": 
                return <FeelsLike currentWeather={currentWeather} userData={userData}/>
            case "gadget__city": 
                return <CityMessage />
            case "gadget__icon":
                return <WeatherDescription currentWeather={currentWeather} />
            case "settings": 
                return <SettingsMessage />
            
        }
    }
    return (
        <nav className="navbar"
        >   
            <p className="user__name"><strong>{userData.user_name}</strong></p>
            <div className="weather__gadget">

                <div className="gadget__main">

                    <i 
                        id="expand__forecast"
                        className={openedTab === "forecast" ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        data-tab="forecast"
                        onClick={handleOpenedTab}
                    />


                    <p 
                        id="gadget__temp" 
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >{currentWeather.temp} {userData.units === "metric" ? " °C" : " °F"}</p>
                    <p 
                        id="gadget__city" 
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
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
                    <i 
                        id="settings"
                        className="settings__icon fa-solid fa-gear"
                        data-tab="settings"
                        onClick={handleOpenedTab}

                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    />
                </div>

                {
                    switchExtras()
                }
            </div>
        </nav>
    )
}

function ExpandForecast() {
    return (
        <div className="gadget__extra ">
            <p className="gadget__extra__text">Click to see more detailed forcast</p>
        </div>
    )
}

function FeelsLike({currentWeather, userData}) {
    return (
        <div className="gadget__extra feels__like">
            <p className="gadget__extra__text">Feels like {currentWeather.feels_like} <span>{userData.units === "metric" ? " °C" : " °F"}</span></p>
        </div>
    )
}

function WeatherDescription({currentWeather}) {
    return (
        <div className="gadget__extra temp">
            <p className="gadget__extra__text">{currentWeather.description}</p>
        </div>
    )
}

function CityMessage() {
    return (
        <div className="gadget__extra city">
            <p className="gadget__extra__text">If displayed city is incorrect you can set it manually in settings</p>
        </div>
    )
}

function SettingsMessage() {
    return (
        <div className="gadget__extra gadget__settings)">
            <p className="gadget__extra__text">Settings</p>
        </div>
    )
}