// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1WcKoTTTb78ZEsA-A3P07K0j9gy4r_3M",
  authDomain: "tom-pos.firebaseapp.com",
  projectId: "tom-pos",
  storageBucket: "tom-pos.appspot.com",
  messagingSenderId: "48668345969",
  appId: "1:48668345969:web:630f238ecf371b2127bdd0"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);

export default fireApp;