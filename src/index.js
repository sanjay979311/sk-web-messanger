import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//import firebase from 'firebase';
import firebase from 'firebase/app'
import "firebase/auth";
import {Provider} from 'react-redux';
import store from './store';
//import firebase from "firebase/app";





// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDSojzgkXFUi2xejffG6KKr3iBxexbhpf0",
    authDomain: "messanger-88163.firebaseapp.com",
    databaseURL: "https://messanger-88163-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "messanger-88163",
    storageBucket: "messanger-88163.appspot.com",
    messagingSenderId: "203832442214",
    appId: "1:203832442214:web:f78fdfa85a449bf5135ca7",
    measurementId: "G-DG260ED1G9"
  };


  firebase.initializeApp(firebaseConfig);
  

 window.store = store;

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
