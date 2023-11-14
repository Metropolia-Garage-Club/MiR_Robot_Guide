import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Idle from './pages/idle';

const Routing = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/L0mk/MiR_Robot_Guide' element={<Idle/>} />
				<Route path='/L0mk/MiR_Robot_Guide/App' element={<App/>} />
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
