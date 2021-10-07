import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {firebaseConfig} from './FirebaseConfig'
import { initializeApp } from "firebase/app";


initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);