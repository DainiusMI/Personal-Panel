import React, {useState, useEffect} from 'react'
import "../css/Settings.css"

export default function Settings({api_keys, userData, setUserData, setOpenedTab}) {

    const [settingsData, setSettingsData] = useState({
        user_name: "",
        units: "",
        city_name: "",
        city_remember: false
    })
    useEffect(() => {
        setSettingsData({
            user_name: userData.user_name,
            units: userData.units,
            city_name: userData.city_name,
            city_remember: userData.city_remember
        })
    }, [userData.user_name, userData.units, userData.city_name])

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setSettingsData(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const [cityError, setCityError] = useState()
    function handleSave() {
        if (userData.city_name !== settingsData.city_name) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${settingsData.city_name}&appid=${api_keys.openedWeatherMap}`).
                then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    }
                    else {
                        setCityError(`City named ${settingsData.city_name} was not found`)
                    }
                }).
                then(data => {
                    setUserData(prevData => ({
                        ...prevData,
                        ...settingsData,
                        latitude: data.coord.lat,
                        longitude: data.coord.lon,
                   
                    }))

                })
        }
        else {
            setUserData(prevData => ({
                ...prevData,
                ...settingsData
            }))
        }
        setOpenedTab("none")
    }

    return (
        <div className="settings">
            
            <div className="settings__username">
                <label htmlFor="user_name">Change User Name: 
                    <input 
                        id='user_name' 
                        type="text" 

                        name='user_name'
                        value={settingsData.user_name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="settings__units">
                <p className='units__text'>Change Measuring Units:</p>
                <div className="units__radio__container">
                    <label htmlFor="metric">
                        <input 
                            id="metric" 
                            type="radio" 
                            
                            value="metric" 
                            name="units" 
                            checked={settingsData.units === "metric"}
                            onChange={handleChange}
                        />
                        Metric 
                    </label>
                    <label htmlFor="imperial">
                        <input 
                            id="imperial" 
                            type="radio" 
                            
                            value="imperial" 
                            name="units" 
                            checked={settingsData.units === "imperial"}
                            onChange={handleChange}
                        />
                        Imperial 
                    </label>
                </div>
                
                
            </div>
            <div className="settings__city">
                <label htmlFor="city_name">Change the City: 
                        <input 
                            id='city_name' 
                            type="text" 

                            name='city_name'
                            value={settingsData.city_name}
                            onChange={handleChange}
                        />
                </label>
                <label htmlFor="city_remember">
                    <input 
                        type="checkbox" 
                        name="city_remember" 
                        id="city_remember" 
                        checked={settingsData.city_remember}
                        onChange={handleChange}
                    />
                    Remember
                </label>
            </div>
            <div className="settings__buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => {setOpenedTab("none")}} >Cancel</button>
            </div>
        </div>
    )
}
