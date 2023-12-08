import React from "react";
import "./MovingToLocation.css";

function MovingToLocation() {
  return (
    <div className="moving-to-location">
      <div className="moving-icon">🤖</div>
      <h2>Moving to {destination}...</h2>
      <p>Please wait, I am heading to the destination.</p>
    </div>
  );
}

export default MovingToLocation;