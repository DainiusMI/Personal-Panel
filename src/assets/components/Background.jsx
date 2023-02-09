import React, {useState, useEffect, useRef} from "react";
import "../css/Background.css"

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
               openedTab !== "forecast" &&
                <Clock openedTab={openedTab}/>
            }
        </div>
    )
}


function Clock({openedTab}) {

    const [date, setDate] = useState()
    
    const updateClock = () => {
        const now = new Date()
        const monthNames = [
            "January", "February", "March", "April", 
            "May", "June", "July", "August", 
            "September", "October", "November", "December"
        ];
        return {
            year: now.getFullYear(),
            month: monthNames[now.getMonth()],
            day: now.getDate(),
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        }
    }

    // update time with custom hook

    useInterval(() => {
        setDate(updateClock())
    }, 1000)

    
    const nth = () => {
        const day = date.day
        if (date !== undefined) {
            return day > 3 ? "th" : day == 3 ? "rd" : day == 2 ? "nd" : "st"
        }
    }
    const formDate = (number) => {
        return number > 9 ? number : `0${number}`
    }
    const clockPosition = () => {
        return openedTab === "todo" ? "clock small" : "clock big"
    }
    return (
        <div className={clockPosition()}>
            {
            date !== undefined &&
            <div className="date__row">
                <p className="date__text clock__text">{date.year}</p>
                <p className="date__text clock__text">{date.month}</p>
                <p className="date__text clock__text">{date.day}{nth()}</p>
            </div>
            }
            {
            date !== undefined &&
            <div className="time__row">
                <p className="time__text clock__text">{formDate(date.hours)}</p>
                <p className="time__text clock__text">{formDate(date.minutes)}</p>
                <p className="time__text clock__text">{formDate(date.seconds)}</p>
            </div>
            }
        </div>
    )
}


// custom hook

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }