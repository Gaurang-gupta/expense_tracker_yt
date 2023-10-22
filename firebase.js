import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB37vFtd402-iSZaVwAeqswBHlw5sn_CuY",
    authDomain: "expense-tracker-76b5d.firebaseapp.com",
    projectId: "expense-tracker-76b5d",
    storageBucket: "expense-tracker-76b5d.appspot.com",
    messagingSenderId: "628478834379",
    appId: "1:628478834379:web:b88379ef978ac0d88acd4e",
    measurementId: "G-TCXQLD471F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export default db
export { provider }