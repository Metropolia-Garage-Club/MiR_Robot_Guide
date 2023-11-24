import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Idle from './pages/idle';
import Kirjasto from './pages/kirjasto';
import Ruokala from './pages/ruokala';
import WC from './pages/wc';
import FeedbackPage from './pages/FeedbackPage'

const Routing = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/L0mk/MiR_Robot_Guide' element={<Idle/>} />
				<Route path='/L0mk/MiR_Robot_Guide/mainPage' element={<App/>} />
				<Route path='/L0mk/MiR_Robot_Guide/kirjasto' element={<Kirjasto />} />
				<Route path='/L0mk/MiR_Robot_Guide/ruokala' element={<Ruokala />} />
				<Route path='/L0mk/MiR_Robot_Guide/wc1' element={<WC />} />
				<Route path='/L0mk/MiR_Robot_Guide/FeedbackPage' element={<FeedbackPage />} />
			</Routes>
		</BrowserRouter>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
