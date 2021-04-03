import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCfdnOztyKLEvt_IHkVKFlYf_COmnd2Uxg",
    authDomain: "barter-app-293a3.firebaseapp.com",
    projectId: "barter-app-293a3",
    storageBucket: "barter-app-293a3.appspot.com",
    messagingSenderId: "327192296989",
    appId: "1:327192296989:web:2d8a5941d78fbe1574d0f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()
