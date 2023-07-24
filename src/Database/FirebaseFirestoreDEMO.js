import React from "react";
import db from "./firebase_init";
import {doc, setDoc, collection} from 'firebase/firestore';

class FirebaseFirestoreDEMO extends React.Component {
    static async addToExistingDocument(text = "Default Data"){
        const testCollectionRef = doc(db, 'testCollection', 'testDocument');
        await setDoc(testCollectionRef, {text}, {merge: true});
    }

    static async addToNewDocument(text = "Default Data"){
        const testNewDocRef = doc(collection(db, 'testCollection'));
        await setDoc(testNewDocRef, {text});
        console.log("Document written with ID: ", testNewDocRef.id);
    }
}

export default FirebaseFirestoreDEMO;