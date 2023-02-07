import React, {useState, useEffect} from "react";
import "../css/background.css"

export default function Background({openedTab, api_keys, userData}) {

    const [backgroundImage, setBackgroundImage] = useState({})
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 19)
        
        fetch(`https://api.unsplash.com/search/photos?query=${userData.background}&per_page=20&client_id=${api_keys.unsplash}`).
        then(resp => resp.json()).
        then(data => {
             setBackgroundImage({
                small: data.results[randomIndex].urls.small,
                medium: data.results[randomIndex].urls.regular,
                large: data.results[randomIndex].urls.full
             })
        })

    }, [userData.background])
    return (
        <div 
            id="main__screen"
            className="background"
            style={{backgroundImage: `url('${backgroundImage.large}')`}}
        >
            {
                <Clock 

                />
            }
        </div>
    )
}


function Clock() {

    const [date, setDate] = useState({
        
    })
    //console.log(new Date())
    return (
        <div className="clock__container">

        </div>
    )
}