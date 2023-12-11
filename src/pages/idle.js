import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import MovingToLocation from "./MovingToLocation";
import Charging from "./Charging";
import GoingHome from "./GoingHome";
import MissionComplete from "./MissionComplete";

function WelcomeScreen() {
  let wave = 0;
  let start = useNavigate();
  const [detectWave, setDetectWave] = useState(wave);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("normal");

  //let detectWave = 0;
  
  const [goHome, setGoHome] = useState(0);
  
  
  useEffect(() => {
    const interval = setInterval(async () => {
      await isGoHome(); //3 seconds
      if (goHome) {
        //const timeout1 = setTimeout(idleWarning, 7000);
        const timeout2 = setTimeout(idleTimeout2, 10000); //60000 = 1 min, 10000 = 10 seconds
        return () => {
          //clearTimeout(timeout1);
          clearTimeout(timeout2);
      }
    }
  }, 10000);
  return  () => clearInterval(interval);
}, [goHome]);


function idleTimeout2() {
    axios({
      method: "POST",
      url: "/detect_wave",
      data:{idle_state: 1},
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

  }
  
  const isGoHome = async () => {
    axios({
      method: "GET",
      url: "/MiR_api",
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      /*setStartIdle(res.startIdle)
      setMissionComplete(res.missionComplete)
      setCharing(res.charging)
      setReturningHome(res.returningHome)*/
    if (res.charging) {
      setCurrentView("charging");
    } else if (res.returningHome) {
      setCurrentView("returningHome");
    } 
    else if (res.moving) {
      setCurrentView("moving");
    } else if (res.missionComplete){
      setCurrentView("complete")
    }
    else {
      setCurrentView("normal");
    }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }
  

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

    /*if (detectWave == 1) {
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
     
      start('/L0mk/MiR_Robot_Guide/mainPage');
      
    }*/
  }

  /*useEffect(() => {
    const interval = setInterval(callAPI,500); //0.5 seconds
    return () => clearInterval(interval);
  })*/
  
  function handleClick() {
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
    
    start('/L0mk/MiR_Robot_Guide/mainPage')
  }
 
  return (
    <div className="WelcomeScreen">
    {currentView === "charging" && <Charging />}
    {currentView === "returningHome" && <GoingHome />}
    {currentView === "moving" && <MovingToLocation />}
    {currentView === "complete" && <MissionComplete />}
    {currentView === "normal" && (

      <div style={{fontSize: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1>Hei, olen Onni-Opas!</h1>
        <p>Voin auttaa sinut perille, saat minut käyntiin painamalla alla olevaa nappia</p>
        <p>I can help you find your way, press the button below to start me</p>
        <button class='button' onClick={handleClick}>Aloita</button>
      </div>
    )
    }
</div>
);
}

export default WelcomeScreen;
