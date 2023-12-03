import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitons: transitions.SCALE
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  
  </React.StrictMode>
);



