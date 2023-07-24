import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const app = initializeApp({
    apiKey: "AIzaSyDSr6vnPJiVcll0zIcNHFVC6vGOUddv6e8",
    authDomain: "seng401-finalproject-a5283.firebaseapp.com",
    projectId: "seng401-finalproject-a5283",
    storageBucket: "seng401-finalproject-a5283.appspot.com",
    messagingSenderId: "966329408319",
    appId: "1:966329408319:web:c3a69fc3205c260f85d18a"
});

const db = getFirestore(app);
export default db;