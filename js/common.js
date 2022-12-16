// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS2roGhwoDBEnXoOSI8LxsvMliSlLoKM0",
  authDomain: "todolist-cca5d.firebaseapp.com",
  databaseURL: "https://todolist-cca5d-default-rtdb.firebaseio.com",
  projectId: "todolist-cca5d",
  storageBucket: "todolist-cca5d.appspot.com",
  messagingSenderId: "830807093359",
  appId: "1:830807093359:web:8847b0668fc6753c96dd9a",
  measurementId: "G-PJGR645J0H",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
