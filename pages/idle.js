import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

function WelcomeScreen() {
  let wave = 0;
  const [detectWave, setDetectWave] = useState(wave);
  let start = useNavigate();

  function handleClick() {
    if (detectWave == 1) {
      start('/L0mk/MiR_Robot_Guide/App');
    } else {
      alert("No Wave");
    }
    
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
