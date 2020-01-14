  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDghxDuuVLzQ-mTOF6TZHeptFuBlF4G_oQ",
    authDomain: "sticky-notes-3c5e2.firebaseapp.com",
    databaseURL: "https://sticky-notes-3c5e2.firebaseio.com",
    projectId: "sticky-notes-3c5e2",
    storageBucket: "sticky-notes-3c5e2.appspot.com",
    messagingSenderId: "471074423875",
    appId: "1:471074423875:web:6db064080476d81b4940f6",
    measurementId: "G-YTQEHV7FVT"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  //firebaseApp.firestore().settings({timestampsInSnapshots: true });
  export default firebaseApp.firestore();