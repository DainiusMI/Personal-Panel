import React, {useState, useEffect} from 'react'

export default function Settings({userData, setUserData}) {

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setUserData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <div className="settings">
            <div className="settings__username">
                <label htmlFor="user_name">Change User Name: 
                    <input 
                        id='user_name' 
                        type="text" 

                        name='user_name'
                        value={userData.user_name}
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
                        checked={userData.units === "metric"}
                        onChange={handleChange}
                    />
                
                </label>
                <label htmlFor="imperial">imperial 
                    <input 
                        id="imperial" 
                        type="radio" 
                        
                        value="imperial" 
                        name="units" 
                        checked={userData.units === "imperial"}
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
                            value={userData.city_name}
                            onChange={handleChange}
                        />
                    </label>
            </div>
        </div>
    )
}
