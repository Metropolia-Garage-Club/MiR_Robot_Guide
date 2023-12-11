import React from "react";
import "./Charging.css";

function Charging() {
  return (
    <div className="charging">
      <div className="charging-icon">⚡</div>
      <h2>Charging...</h2>
      <p>
        Currently not accepting missions. Please wait until the charging is
        complete.
      </p>
    </div>
  );
}

export default Charging;
