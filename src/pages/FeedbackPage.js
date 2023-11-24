
import React, { useState } from 'react';
import './FeedbackPage.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function FeedbackPage() {
    const [selectedFace, setSelectedFace] = useState(null);
    const navigate = useNavigate();

    const handleFaceClick = (index) => {
        setSelectedFace(index);
        // You can send the feedback data to the server or perform other actions here
        

        axios({
            method: "POST",
            url: "/feedback",
            params:{selectedFace: `Face-${index}`},
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
          });

          
        navigate('/L0mk/MiR_Robot_Guide/mainPage');

    };

    return (
        <div>
            <h1>How was your experience?</h1>
            <div className="face-container">
                {[1, 2, 3, 4, 5].map((index) => (
                    <img
                        key={index}
                        src={`faces/face-${index}.png`} // Replace with actual image sources
                        alt={`Face ${index}`}
                        className={selectedFace === index ? 'selected' : ''}
                        onClick={() => handleFaceClick(index)} />
                ))}
            </div>
        </div>
    );
}

export default FeedbackPage;