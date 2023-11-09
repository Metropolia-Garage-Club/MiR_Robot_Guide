import { useEffect, useState } from "react";

const Office = (props) => {
  const [prevEl, setPrevEl] = useState(undefined);

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
		onClick={() => alert("Hissit")}
      />

      <path
        className="room auditorio"
        id="auditorio"
        d="M800 930H1223V1400H800Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("auditorio")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("Auditorio")}
      />

      <path
        className="room ulysseus"
        id="ulysseus"
        d="M1225 985H1420V1400H1225Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("ulysseus")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("Ulysseus")}
      />

	  <path
        className="room ulysseus"
        id="ulysseus-2"
        d="M10 1120H280V1385H10Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("ulysseus-2")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("Ulysseus Toimisto")}
      />

	  <path
        className="room kitchen"
        id="kitchen-1"
		d="M1234 345H1574V570H1234Z"
		stroke-width="2"
        onMouseEnter={() => props.onHovered("kitchen-1")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("Kahvio")}
      />
	  
	  <path
        className="room kitchen"
        id="kitchen-2"
		d="M1616 890H1683V1155H1616Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("kitchen-2")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("Ruokala")}
      />

      <path
        className="room wc"
        id="wc-1"
        d="M1120 93H1264V250H1120Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("wc-1")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("WC")}
      />
	  
	  <path
        className="room wc"
        id="wc-2"
        d="M370 1235H580V1410H370Z"
        stroke-width="2"
        onMouseEnter={() => props.onHovered("wc-2")}
        onMouseLeave={() => props.onHovered(undefined)}
		onClick={() => alert("WC-2")}
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
		  xlinkHref={require("./Helia-talo pohjat 2020-03.jpg")}
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
