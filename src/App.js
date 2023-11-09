import "./styles.css";
import Office from "./img";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [selected, setSelected] = useState(undefined);
  
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
		  onClick={() => alert("Kirjasto")} 
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
		  onClick ={() => alert("Auditorio")}
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
		  onClick ={() => alert("Ulysseus")}
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
		  onClick ={() => alert("Ulysseus Toimisto")}
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
		  onClick ={() => alert("Kahvio")}
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
		  onClick ={() => alert("Ruokala")}
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
		  onClick ={() => alert("WC")}
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
		  onClick ={() => alert("WC 2")}
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
}