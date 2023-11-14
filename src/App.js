import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import "./styles.css";
import Office from "./img";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages';
import MainPage from './pages/mainPage';
import Index from './pages/index';
import Ruokala from './pages/ruokala';
import Kirjasto from './pages/kirjasto';
import WC from './pages/wc';

function App() {
	return (
		<Router>
		<Navbar />  
			<Routes>
				<Route exact path='/' exact element={<Home />} />
				<Route path='/mainPage' element={<MainPage />} />
				<Route path='/kirjasto' element={<Kirjasto />} />
				<Route path='/index' element={<Index />} />
				<Route path='/ruokala' element={<Ruokala />} />
				<Route path='/wc' element={<WC />} />
			</Routes>
		</Router>
	);
}

export default App;
