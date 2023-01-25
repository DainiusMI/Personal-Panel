import React, {useState, useEffect} from 'react'
import { supabase } from './client'
import Weather from './assets/components/Weather'



// get IP from:
// https://api.bigdatacloud.net/data/client-ip


// https://app.supabase.com/project/zbhpohptkdsrrkjqwqol/editor/27042
// db password
// xSwwS2kwqTAZLSIr

export default function App() {

  const loggedInAs = "DainiusMI"

  const [userData, setUserData] = useState({
    user_ip: "",
    units: "metric"
  })
  localStorage.clear()
  
/*
  function toLocalStorage() {

    localStorage.setItem("personal_panel", JSON.stringify(userData))
  }
  function fromLocalStorage() {
    return JSON.parse(localStorage.getItem("personal_panel"))
  }
  */
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
  console.log(userData)




  /*
  
  */
 
 return (
   <div className="App">
      <Weather 
        userData={userData}
        setUserData={setUserData}
     

      />
    </div>
  )
}

