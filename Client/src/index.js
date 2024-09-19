import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import 'swiper/css';
import  'swiper/css/free-mode';
import  'swiper/css/navigation';
import  'swiper/css/pagination';
import  'swiper/css/thumbs';
import { Provider } from 'react-redux';
import {store} from './Redux/Store.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
        <App/>
     </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
