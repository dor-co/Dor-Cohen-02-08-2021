import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from './screens/container/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from "redux";
import allReducers from "./redux/indexReducers"
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

var firebaseConfig = {
  apiKey: "AIzaSyAc17addXAYshbHb1QM0-j7Bb2VhroEe40",
  authDomain: "weatherapp-15100.firebaseapp.com",
  projectId: "weatherapp-15100",
  storageBucket: "weatherapp-15100.appspot.com",
  messagingSenderId: "300554058234",
  appId: "1:300554058234:web:7c0037602c330731d5cc43",
  measurementId: "G-VZ7P0D6LE4"
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Container />
        {/* <App /> */}
      </FirebaseAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
