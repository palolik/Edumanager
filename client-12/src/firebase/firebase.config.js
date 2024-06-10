// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATXr1hj1brjn5aqu6EG_2g9tf3Qh79BUY",
  authDomain: "crudapp-beb6a.firebaseapp.com",
  projectId: "crudapp-beb6a",
  storageBucket: "crudapp-beb6a.appspot.com",
  messagingSenderId: "845377309482",
  appId: "1:845377309482:web:d3b3729936a7666032ec53",
  measurementId: "G-NH2075TB99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;