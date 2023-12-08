import "./styles.css";
import Office from "./img";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [selected, setSelected] = useState(undefined);
  const [startIdle, setStartIdle] = useState(false);
  const [charging, setCharing] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const [returningHome, setReturningHome] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      await isGoHome(); //10 seconds
      if (startIdle) {
        //const timeout1 = setTimeout(idleWarning, 7000);
        const timeout2 = setTimeout(idleTimeout2, 10000); //60000 = 1 min, 10000 = 10 seconds
        return () => {
          //clearTimeout(timeout1);
          clearTimeout(timeout2);
      }
    }
  }, 10000);
  return  () => clearInterval(interval);
}, [startIdle]);
  
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

    console.log("navigating from app to idle");
    navigate('/L0mk/MiR_Robot_Guide/');
  }
 
  const isGoHome = async () => {
    axios({
      method: "GET",
      url: "/MiR_api",
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      setStartIdle(res.startIdle)
      setMissionComplete(res.missionComplete)
      setCharing(res.charging)
      setReturningHome(res.returningHome)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    console.log(startIdle)
  }

  const handleFeedbackClick = () => {
    navigate('/L0mk/MiR_Robot_Guide/FeedbackPage')
  }

  function clickRoom(num) {
    axios({
      method: "POST",
      url: "/MiR_api",
      params:{room_num: num,},
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

  function toKirjasto() {
    console.log("navigating from app to kirjasto");
    navigate('/L0mk/MiR_Robot_Guide/kirjasto');
  }

  function toRuokala() {
    console.log("navigating from app to ruokala");
    navigate('/L0mk/MiR_Robot_Guide/ruokala');
  }

  function toWC1() {
    console.log("navigating from app to WC1");
    navigate('/L0mk/MiR_Robot_Guide/wc1');
  }

  function toIdle() {
    console.log("navigating from app to idle");
    navigate('/L0mk/MiR_Robot_Guide');
  }

  return (
    <div className="App">
      
      <div className="rooms">
      <div
		      onClick={() => {toIdle()}}
          className={`feedback`}
        >
          Takaisin alkuun Back to Start
        </div>
        <p></p>
        <p className="tip">
         Paina huoneen nimeä listalta, jonne haluat mennä, seuraa minua määränpäähän.
        </p>
        <p className="tip">
        Press the name of the room in the list below where you want to go, you can then follow me to the destination
        </p>
        
        
        <p></p>
        <div>
          <b>Huoneet eri kerroksessa / Rooms on different floor</b>
        </div>
        
		    <div
          onMouseEnter={() => setSelected("kirjasto")}
          onMouseOut={() => setSelected(undefined)}
		      onClick={() => {
            clickRoom(4);
            toKirjasto();
          }}
          className={`room-link ${selected === "kirjasto" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#3b82f6"
            }}
          ></span>
          Kirjasto / Library
        </div>
        <div
          onMouseEnter={() => setSelected("hissit")}
          onMouseOut={() => setSelected(undefined)}
		  onClick={() => clickRoom(4)} 
          className={`room-link ${selected === "hissit" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#3b82f6"
            }}
          ></span>
          Hissit / Elevators
        </div>
        <br />
        <div>
          <b>Tilat aulan yhteydessä / Rooms around the lobby</b>
        </div>
        <div
          onMouseEnter={() => setSelected("auditorio")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => clickRoom(2)}
          className={`room-link ${selected === "auditorio" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#a229b6"
            }}
          ></span>
          Auditorio / Auditorium
        </div>
        <div
          onMouseEnter={() => setSelected("ulysseus")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => clickRoom(0)}
          className={`room-link ${selected === "ulysseus" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#34d399"
            }}
          ></span>
          Ulysseus
        </div>
		<div
          onMouseEnter={() => setSelected("ulysseus-2")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => clickRoom(6)}
          className={`room-link ${selected === "ulysseus-2" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#34d399"
            }}
          ></span>
          Ulysseus toimisto / Office
        </div>
        <br />
        <div>
          <b>Yhteiset tilat / communal spaces</b>
        </div>
        <div
          onMouseEnter={() => setSelected("kitchen-1")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => clickRoom(3)}
          className={`room-link ${selected === "kitchen-1" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#00ced1"
            }}
          ></span>
          Kahvio / Cafe
        </div>
				<div
          onMouseEnter={() => setSelected("kitchen-2")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => {
        clickRoom(5);
        toRuokala();
      }}
          className={`room-link ${selected === "kitchen-2" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#00ced1"
            }}
          ></span>
          Ruokala / Cafeteria
        </div>
        <div
          onMouseEnter={() => setSelected("wc-1")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => {
        clickRoom(1);
        toWC1();
      }}
          className={`room-link ${selected === "wc-1" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#ff1493"
            }}
          ></span>
          WC
        </div>
		<div
          onMouseEnter={() => setSelected("wc-2")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => clickRoom(6)}
          className={`room-link ${selected === "wc-2" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#ff1493"
            }}
          ></span>
          WC 2
        </div>
        <div
		      onClick={() => {handleFeedbackClick()}}
          className={`feedback`}
        >
          Feedback
        </div>
      </div>
      <Office
        selected={selected}
        onHovered={(id) => {
          setSelected(id);
        }}
      />
    </div>
  );
}
