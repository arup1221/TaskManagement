import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBvMfSyxF1V58rp2m9pef-6uUpTqfo48W8",
  authDomain: "filemangement-fe016.firebaseapp.com",
  databaseURL: "https://filemangement-fe016-default-rtdb.firebaseio.com",
  projectId: "filemangement-fe016",
  storageBucket: "filemangement-fe016.appspot.com",
  messagingSenderId: "810727869771",
  appId: "1:810727869771:web:914b212e32ec07a4b92cce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
