import React, {useState, useEffect} from 'react'
import Navbar from './assets/components/Navbar'
import Settings from './assets/components/Settings'


// get IP from:
// https://api.bigdatacloud.net/data/client-ip


// https://app.supabase.com/project/zbhpohptkdsrrkjqwqol/editor/27042
// db password
// xSwwS2kwqTAZLSIr

export default function App() {

  const api_keys = {
    openedWeatherMap: "b3f5fab1dae2062b7cd950a48a936e79",
    ipToLocation: "3K7hAsyNM17mPQf6SuYWr9B6KY8kY6f0"
  }


  const [userData, setUserData] = useState({
    user_ip: "",
    user_name: "user",
    units: "metric",
    city_name: "",
    errors: []
  })
  userData.errors.length > 0 && console.log(userData.errors)
  // get IP
  useEffect(() => {
    fetch("https://api.bigdatacloud.net/data/client-ip").
    then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      else {
        setUserData(prevData => ({
          ...prevData,
          errors: [...prevData.errors, "client ip failed"]
        }))
        return
      }
    }).
    then(data => {
      if (data.ipString !== userData.user_ip) {
        setUserData(prevData => ({
          ...prevData,
          user_ip: data.ipString
        }))
      }
    })
       
  }, [])
  // get location data after knowing the IP
  useEffect(() => {
    if (/\d+(\.\d+){3}/.test(userData.user_ip)) {
        fetch(`https://api.apilayer.com/ip_to_location/${userData.user_ip}`, {
            method: "GET",
            headers: {
                "apikey": api_keys.ipToLocation
            }
        }).
        then(resp => {
            if (resp.ok) {
                return resp.json()
            }
            else {
                setUserData(prevData => ({
                    ...prevData,
                    errors: [...prevData.errors, "location to ip failed"]
                }))
            }
        }).
        then(data => {
          setUserData(prevData => ({
                ...prevData,
                country_name: data.country_name,
                country_code: data.country_code,
                city_name: data.city,
                latitude: data.latitude,
                longitude: data.longitude,
            }))
        })
    }

}, [userData.user_ip])

 return (
   <div className="App">
      <Navbar 
        api_keys={api_keys}
        userData={userData}
        setUserData={setUserData}
      />
      <Settings
        api_keys={api_keys}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  )
}



  //localStorage.clear()
  
/*
  function toLocalStorage() {

    localStorage.setItem("personal_panel", JSON.stringify(userData))
  }
  function fromLocalStorage() {
    return JSON.parse(localStorage.getItem("personal_panel"))
  }
  */