import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";

function WelcomeScreen() {
  let wave = 0;
  let start = useNavigate();
  const [detectWave, setDetectWave] = useState(wave);
  //let detectWave = 0;

  const handleClick = async () => {
    /*try {
      const data = await (await fetch(`http://localhost:5000/detect_wave`)).json()
      console.log(data)
      setDetectWave(data.wave_detected)
    } catch(err) {
      console.log(err.message)
    }
    */
    
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
  

    console.log("detectWave ",detectWave)

    //if (detectWave == 1) {
    //  start('/L0mk/MiR_Robot_Guide/App');
    //} else {
    //  alert("No Wave");
    //}
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Hei, nimeni on Onni.Opas!</h1>
      <p>Vilkuta minulle niin ohjaan sinut perille!</p>
      <h1>Hello, my name is Happy.Guide!</h1>
      <p>Wave at me and I will take you where you need to go! </p>
      <button onClick={handleClick}>Start</button>
    </div>
  );
}

export default WelcomeScreen;
