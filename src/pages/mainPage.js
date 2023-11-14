import React from "react";
import "./styles.css";
import Office from "./img";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
	const [selected, setSelected] = useState(undefined);
	const navigate = useNavigate();
	const [goHome, setGoHome] = useState(0);
	const isGoHome = async () => {
    axios({
      method: "GET",
      url: "/MiR_api",
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      setGoHome(res.returning_home)
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
	}
	
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

    navigate('/L0mk/MiR_Robot_Guide/');
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
	
	return (

		<div className="App">
      <div className="rooms">
        <h2>Haaga-Helia</h2>
        <p className="tip">
         Paina huoneen nimeä listalta, jonne haluat mennä
        </p>
        <div>
          <b>Huoneet eri kerroksessa</b>
        </div>
		<div
          onMouseEnter={() => setSelected("kirjasto")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => navigate("/kirjasto")} 
          className={`room-link ${selected === "kirjasto" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#3b82f6"
            }}
          ></span>
          Kirjasto
        </div>
        <div
          onMouseEnter={() => setSelected("hissit")}
          onMouseOut={() => setSelected(undefined)}
		  onClick={() => alert("Hissit")} 
          className={`room-link ${selected === "hissit" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#3b82f6"
            }}
          ></span>
          Hissit
        </div>
        <br />
        <div>
          <b>Tilat aulan yhteydessä</b>
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
          Auditorio
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
          Ulysseus toimisto
        </div>
        <br />
        <div>
          <b>Yhteiset tilat</b>
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
          Kahvio
        </div>
				<div
          onMouseEnter={() => setSelected("kitchen-2")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => navigate("/ruokala")}
          className={`room-link ${selected === "kitchen-2" ? "active" : ""}`}
        >
          <span
            className="square"
            style={{
              backgroundColor: "#00ced1"
            }}
          ></span>
          Ruokala
        </div>
        <div
          onMouseEnter={() => setSelected("wc-1")}
          onMouseOut={() => setSelected(undefined)}
		  onClick ={() => navigate("/wc")}
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
		  onClick ={() => clickRoom(1)}
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
      </div>
      <Office
        selected={selected}
        onHovered={(id) => {
          setSelected(id);
        }}
      />
    </div>
	);
};

export default MainPage;
