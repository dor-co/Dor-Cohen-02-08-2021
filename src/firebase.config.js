import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAc17addXAYshbHb1QM0-j7Bb2VhroEe40",
    authDomain: "weatherapp-15100.firebaseapp.com",
    projectId: "weatherapp-15100",
    storageBucket: "weatherapp-15100.appspot.com",
    messagingSenderId: "300554058234",
    appId: "1:300554058234:web:7c0037602c330731d5cc43",
    measurementId: "G-VZ7P0D6LE4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default db;