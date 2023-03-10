import React, {useState, useEffect} from 'react'
import Navbar from './assets/components/Navbar'
import Settings from './assets/components/Settings'
import Forecast from './assets/components/Forecast'
import Background from './assets/components/Background'
import ToDo from './assets/components/ToDo'
import Footer from './assets/components/Footer'


export default function App() {

  const api_keys = {
    openedWeatherMap: "b3f5fab1dae2062b7cd950a48a936e79",
    ipToLocation: "3K7hAsyNM17mPQf6SuYWr9B6KY8kY6f0",
    unsplash: "MIxz9_aBuCzBElEKHhglqcLPlVS4NbtJdyAJGXelVKo",
    api_ninjas: "/o/LAoa+7TG7v1KX6dxsVg==9uyHCBOTmCjaGUSE"
  }

  
  const [userData, setUserData] = useState(fromLocalStorage()?.userData || {
    user_ip: "",
    user_name: "user",
    units: "metric",
    background: "random",
    city_name: "",
    city_remember: false
  })
  const [toDoData, setToDoData] = useState(fromLocalStorage()?.toDoData || [])
  //localStorage.clear()

  function toLocalStorage() {
    const data = {}
    data.userData = userData
    data.toDoData = toDoData
    localStorage.setItem("personal_panel", JSON.stringify(data))
  }
  useEffect(() => {
    toLocalStorage()
  }, [userData, toDoData])

  function fromLocalStorage() {
    const dataObject = JSON.parse(localStorage.getItem("personal_panel"))
    return dataObject
  }

  // get IP
  useEffect(() => {
    fetch("https://api.bigdatacloud.net/data/client-ip").
    then(resp => {
      if (resp.ok) {
        return resp.json()
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
        }).
        then(data => {
          if (userData.city_remember === false) {
            setUserData(prevData => ({
                  ...prevData,
                  country_name: data.country_name,
                  country_code: data.country_code,
                  city_name: data.city,
                  latitude: data.latitude,
                  longitude: data.longitude,
              }))
          }
        })
    }

}, [userData.user_ip])

//const [openedTab, setOpenedTab] = useState("todo")
const [openedTab, setOpenedTab] = useState("none")

const handleOpenedTab = (event) => {
  openedTab === event.target.dataset.tab ?
    setOpenedTab("none") :
    setOpenedTab(event.target.dataset.tab)
}
 return (
   <div className="App">
      <Navbar 
        api_keys={api_keys}
        userData={userData}
        setUserData={setUserData}
        openedTab={openedTab}
        handleOpenedTab={handleOpenedTab}
      />
      {
        openedTab === "settings" &&
        <Settings
          api_keys={api_keys}
          userData={userData}
          setUserData={setUserData}
          setOpenedTab={setOpenedTab}
        />
      }
      {
        openedTab === "forecast" &&
        <Forecast
            api_keys={api_keys}
            userData={userData}
            setUserData={setUserData}
            setOpenedTab={setOpenedTab}
        />
      }
      <Background
          userData={userData}
          openedTab={openedTab}
          api_keys={api_keys}
      />

      {
        openedTab === "todo" &&
        <ToDo 
          toDoData={toDoData}
          setToDoData={setToDoData}
        />
      }
      {
        userData.user_name === "user" &&
        <Footer  />
      }
    </div>
  )
}



