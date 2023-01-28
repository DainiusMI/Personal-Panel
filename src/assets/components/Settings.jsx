import React, {useState, useEffect} from 'react'

export default function Settings({userData, setUserData}) {

    const [settingsData, setSettingsData] = useState({
        user_name: "",
        units: "",
        city_name: ""
    })
    useEffect(() => {
        setSettingsData({
            user_name: userData.user_name,
            units: userData.units,
            city_name: userData.city_name
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
    function handleSave() {
        setUserData(prevData => ({
            ...prevData,
            ...settingsData
        }))
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
                <label htmlFor="metric">Metric 
                    <input 
                        id="metric" 
                        type="radio" 
                        
                        value="metric" 
                        name="units" 
                        checked={settingsData.units === "metric"}
                        onChange={handleChange}
                    />
                
                </label>
                <label htmlFor="imperial">imperial 
                    <input 
                        id="imperial" 
                        type="radio" 
                        
                        value="imperial" 
                        name="units" 
                        checked={settingsData.units === "imperial"}
                        onChange={handleChange}
                    />
                </label>
                
                
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
            </div>
            <button onClick={handleSave}>Save Changes</button>
        </div>
    )
}
