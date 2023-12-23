import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEAThLZB5PjGFuF38LLsga9k0omHfnMTk",
    authDomain: "fuelestimator-e1465.firebaseapp.com",
    projectId: "fuelestimator-e1465",
    storageBucket: "fuelestimator-e1465.appspot.com",
    messagingSenderId: "962096356299",
    appId: "1:962096356299:web:59f05b22a95d3f2f95744e",
    measurementId: "G-RPLCS5TX9D"
  };

const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);