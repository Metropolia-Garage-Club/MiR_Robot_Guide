import React, { Component } from 'react';
import background from "./Onni-logo.png";
import './styles.css';

/*
const myStyle={
     backgroundImage: `url(${background})` ,
     fontSize:'50px',
     backgroundRepeat: 'no-repeat',
	 textAlign: 'center',
	 
 };
*/

const Blogs = () => {
	return (
		<div className="center" /*style={myStyle}*/ >
      <body >
        <h1>
		Hei, olen Onni-Opas!
		</h1>
        <h2>
          Voin auttaa sinut perille, saat minut käyntiin vilkuttamalla minulle tai painamalla alla olevaa nappia
        </h2>
		<button onclick='myFunction()'>Aloita</button>
      </body>
	  
	  </div>
	);
};

export default Blogs;
