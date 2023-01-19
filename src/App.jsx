import React, {useState, useEffect} from 'react'

import Weather from './assets/components/Weather'



// get IP from:
// https://api.bigdatacloud.net/data/client-ip

export default function App() {

  const [userData, setUserData] = useState({
    user_name: "",
    ip: "88.118.115.175",
})

  return (
    <div className="App">
      <Weather 
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  )
}

