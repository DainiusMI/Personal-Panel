import React, {useState, useEffect} from "react";
import "../css/background.css"

export default function Background({openedTab, api_keys}) {

    const [backgroundImage, setBackgroundImage] = useState({})
    const query = "dark"
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 19)
        
        fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${api_keys.unsplash}`).
        then(resp => resp.json()).
        then(data => {
             console.log(data.results[randomIndex])
             setBackgroundImage({
                small: data.results[randomIndex].urls.small,
                medium: data.results[randomIndex].urls.regular,
                large: data.results[randomIndex].urls.full
             })
        })
        console.log(backgroundImage)

    }, [])
    //console.log(backgroundImage)
    return (
        <div 
            id="main__screen"
            className="background"
            style={{backgroundImage: `url('${backgroundImage.large}')`}}
        >
            {
            
            }
        </div>
    )
}