import { useNavigate } from "react-router-dom";

function CalculationScreen() {
    const navigate = useNavigate();
    var currentTime = Date.now();
    var futureTime = currentTime + 5000;

    var countDownDate = new Date(futureTime);
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
    
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
    
        // Time calculations for minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML =  minutes + "m " + seconds + "s ";
    
        // If the count down is finished, go to 
        if (distance < 0) {
            clearInterval(x);
            navigate('/L0mk/MiR_Robot_Guide');
    }
}, 1000);
   
  return (
    <div style={{fontSize: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Reittiä lasketaan... / Calculating route...</h1>
      <p>Odota pieni hetki, lähden kohta liikkeelle</p>
      <p>Please wait one monent, I'll guide you to your destination soon</p>
    </div>
  );
}

export default CalculationScreen;
