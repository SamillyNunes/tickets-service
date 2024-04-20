// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUFBydW805vm_zrBZnauLQi1V0l2hzKy0",
  authDomain: "call-suport.firebaseapp.com",
  projectId: "call-suport",
  storageBucket: "call-suport.appspot.com",
  messagingSenderId: "133984276486",
  appId: "1:133984276486:web:00a023a9758b4a57cc3387",
  measurementId: "G-YR5FWS0RBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storageDb = getStorage(app);
// const analytics = getAnalytics(app);

export { auth, db, storageDb };