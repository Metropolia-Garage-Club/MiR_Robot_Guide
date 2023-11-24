import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Office = (props) => {
  const [prevEl, setPrevEl] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.selected) {
      if (prevEl) {
        prevEl.classList.remove("active");
      }

      let el = document.getElementById(props.selected);
      if (el) {
        el.classList.add("active");
        setPrevEl(el);
      }
    }
  }, [props.selected, prevEl]);

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
    navigate('/L0mk/MiR_Robot_Guide/ruokala')
  }

  function toWC1() {
    console.log("navigating from app to WC1");
    navigate('/L0mk/MiR_Robot_Guide/wc1')
  }

  function toMain() {
    navigate('/L0mk/MiR_Robot_Guide/mainPage')
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
	    className="responsive"
      width="2469"
      height="1685"
      fill="none"
      viewBox="0 0 2469 1685"
    >
      <path fill="#fff" d="M0 0H2469V1685H0Z"></path>
      <path fill="url(#pattern0)" d="M0 0H2469V1685H0Z"></path>
	  
	   <path
        className="room hissit"
        id="hissit"
        d="M870 350H1160V570H870Z"
        strokeWidth="2"
        onMouseEnter={() => props.onHovered("hissit")}
        onMouseLeave={() => props.onHovered(undefined)}
		    onClick ={() => {
          clickRoom(4);
          toMain();
        }} 
      />

      <path
        className="room auditorio"
        id="auditorio"
        d="M800 930H1223V1400H800Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("auditorio")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(2);
          toMain();
        }} 
      />

      <path
        className="room ulysseus"
        id="ulysseus"
        d="M1225 985H1420V1400H1225Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("ulysseus")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(0);
          toMain();
        }} 
      />

	  <path
        className="room ulysseus"
        id="ulysseus-2"
        d="M10 1120H280V1385H10Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("ulysseus-2")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(6);
          toMain();
        }} 
      />

	  <path
        className="room kitchen"
        id="kitchen-1"
		d="M1234 345H1574V570H1234Z"
		stroke-width="2"
        onMouseEnter={() => props.onHovered("kitchen-1")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(6);
          toMain();
        }} 
      />
	  
	  <path
        className="room kitchen"
        id="kitchen-2"
		d="M1616 890H1683V1155H1616Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("kitchen-2")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(5);
          toRuokala();
        }}
      />

      <path
        className="room wc"
        id="wc-1"
        d="M1120 93H1264V250H1120Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("wc-1")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(1);
          toWC1();
        }}
      />
	  
	  <path
        className="room wc"
        id="wc-2"
        d="M370 1235H580V1410H370Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("wc-2")}
        onMouseLeave={() => props.onHovered(undefined)}
        onClick ={() => {
          clickRoom(6);
          toMain();
        }} 
      />

      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="scale(.00114 .00162)"
            xlinkHref="#image0"
          ></use>
        </pattern>
        <image
		  xlinkHref={require("./Helia-talo-vessa.jpg")}
		  alt="Kartta"
		  class="responsive"
          id="image0"
          width="876"
          height="618"
        ></image>
      </defs>
    </svg>
  );
};

export default Office;
