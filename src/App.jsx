import React, {useState, useEffect} from 'react'

import Weather from './assets/components/Weather'



// get IP from:
// https://api.bigdatacloud.net/data/client-ip

export default function App() {



  const [userData, setUserData] = useState({
    user_name: "",
    user_ip: "",
    units: "metric"
  })
  //localStorage.clear()
  function toLocalStorage() {

    localStorage.setItem("personal_panel", JSON.stringify(userData))
  }
  function fromLocalStorage() {
    return JSON.parse(localStorage.getItem("personal_panel"))
  }
  useEffect(() => {

    fetch("https://api.bigdatacloud.net/data/client-ip").
    then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      else {
        setUserData(prevData => ({
          ...prevData,
          errors: ["client ip"]
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

  useEffect(() => { toLocalStorage() }, [userData])



  /*
  
  <Weather 
    userData={userData}
    setUserData={setUserData}
 
    toLocalStorage={toLocalStorage}
    fromLocalStorage={fromLocalStorage}
  />
  */

  return (
    <div className="App">
    </div>
  )
}

