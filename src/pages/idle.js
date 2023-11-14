import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";

function WelcomeScreen() {
  let wave = 0;
  let start = useNavigate();
  const [detectWave, setDetectWave] = useState(wave);
  //let detectWave = 0;

  const callAPI = async () => {
    axios({
      method: "GET",
      url: "/detect_wave",
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      setDetectWave(res.wave_detected)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    if (detectWave == 1) {
      axios({
        method: "POST",
        url: "/detect_wave",
        data:{idle_state: 0},
      })
      .then((response) => {
        const res = response.data
        console.log(res)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
     
      start('/L0mk/MiR_Robot_Guide/App');
    }
  }

  useEffect(() => {
    const interval = setInterval(callAPI,500); //0.5 seconds
    return () => clearInterval(interval);
  })
  
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Hei, nimeni on Onni.Opas!</h1>
      <p>Vilkuta minulle niin ohjaan sinut perille!</p>
      <h1>Hello, my name is Happy.Guide!</h1>
      <p>Wave at me and I will take you where you need to go! </p>
    </div>
  );
}

export default WelcomeScreen;
