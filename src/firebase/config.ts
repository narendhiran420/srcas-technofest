import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
|--------------------------------------------------------------------------
| Firebase Configuration
|--------------------------------------------------------------------------
| IMPORTANT:
| Replace the values below with the SAME Firebase config you already use
| for your Techno Feast project.
|--------------------------------------------------------------------------
*/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiuis62-VLUcP7YbViqhnSBtpHd5grwH4",
  authDomain: "srcas-d2d15.firebaseapp.com",
  databaseURL: "https://srcas-d2d15-default-rtdb.firebaseio.com",
  projectId: "srcas-d2d15",
  storageBucket: "srcas-d2d15.firebasestorage.app",
  messagingSenderId: "398095566319",
  appId: "1:398095566319:web:9bc61547725697d375a21a",
  measurementId: "G-MZYRM4E718"
};

/*
|--------------------------------------------------------------------------
| Initialize Firebase
|--------------------------------------------------------------------------
*/

const app = initializeApp(firebaseConfig);

/*
|--------------------------------------------------------------------------
| Firestore
|--------------------------------------------------------------------------
*/

export const db = getFirestore(app);

/*
|--------------------------------------------------------------------------
| Export Firebase app
|--------------------------------------------------------------------------
*/

export default app;