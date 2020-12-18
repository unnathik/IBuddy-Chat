import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDy-k8H-TAjyoKt9-6tJDFA2TArCuHDMEY",
    authDomain: "ibuddy-psn-hackathon.firebaseapp.com",
    projectId: "ibuddy-psn-hackathon",
    storageBucket: "ibuddy-psn-hackathon.appspot.com",
    messagingSenderId: "69754386579",
    appId: "1:69754386579:web:10f5ccfb3195b6bf20f566",
    measurementId: "G-L4S7L9H482"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;