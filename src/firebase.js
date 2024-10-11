import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDocs, onSnapshot, addDoc, query } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC8SrT428nSMirAAevqXZREqWTTLeWUOFo",
    authDomain: "jlinks-app.firebaseapp.com",
    projectId: "jlinks-app",
    storageBucket: "jlinks-app.appspot.com",
    messagingSenderId: "351697917012",
    appId: "1:351697917012:web:82c20ddaeac9cf44bb09c1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const user = auth.currentUser;

if (user) {
  const userId = user.uid;
  // Pass userId to ProfileForm and ProfileDisplay
}



export {auth, db, storage};