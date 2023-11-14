import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './styles.css';


	
const Index = () => {
	return (
		<div className="center" >
    <body >
        <h1>
		Hei, olen Onni-Opas!
		</h1>
        <h2>
         Voin auttaa sinut perille, saat minut käyntiin vilkuttamalla minulle tai painamalla alla olevaa nappia
        </h2>
		
    </body>
	<Link class="button" to="/mainPage">
		Aloita
	</Link>
	   </div>
	
	);
};

export default Index;
