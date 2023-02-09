import React, {useState} from "react";
import "../css/Footer.css"
export default function Footer() {

    return (
        <footer className="footer">
            <p className="description">
                This project is a personal panel that contains several functions for your personal use. 
                Main goal of this project was to practice the use of APIs.
                <br/>In your personal panel you can create notes for yourself, see the weather forcast, change settings like user name, city name or background theme.
                <br/>All of the data enter is saved in local storege under the key of personal_panel. 
                There for will be seen on your current device only.
                <br/><strong>Upon changing the user name all of this information no longer be displayed</strong>
            </p>
            <div className="api__container">
                <p className="description">List of APIs used with the reason why:</p>
                <ul className="api__list">
                    <li><a href="https://www.bigdatacloud.com/packages/ip-geolocation">BigDataCloud</a> to get users IP adress for other APIs.</li>                  
                    <li><a href="https://openweathermap.org/current">OpenedWeatherMap</a> to get current weather conditions.</li>
                    <li><a href="https://apilayer.com/marketplace/ip_to_location-api">APILayer</a> to convert IP into geo location.</li>
                    <li><a href="https://openweathermap.org/forecast5">OpenedWeatherMap</a> to get future weather forecasts.</li>
                    <li><a href="https://unsplash.com/">Unsplash</a> to get themed images for the background.</li>
                    <li><a href="https://openweathermap.org/forecast5#geocoding">OpenedWeatherMap</a> to change geo loaction by city name</li>
                </ul>
            </div>
            <p className="description">
                
            </p>
        </footer>
    )
}