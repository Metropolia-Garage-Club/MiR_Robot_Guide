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
		  xlinkHref={require("./Helia-talo-kirjasto.jpg")}
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
