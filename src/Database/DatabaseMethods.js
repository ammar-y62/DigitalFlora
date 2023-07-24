import db from './firebase_init'
import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, QuerySnapshot} from "firebase/firestore";
import { User, userConverter} from '../Models/UserCustomObject.js';
import {Garden, gardenConverter} from "../Models/GardenCustomObject";
import {Plant, plantConverter} from "../Models/PlantCustomObject.js";
import {DiscussionPost, postConverter} from "../Models/DiscussionPostCustomObject";


const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export async function addUser(username, password) {
    const userRef = doc(db, "users", username).withConverter(userConverter);
    const userDocumentSnapshot = await getDoc(userRef);
    const gardenRef = doc(db, "gardens", username).withConverter(gardenConverter);

    if (userDocumentSnapshot.exists()) {
        alert("Email already in use. (Did you mean to login??)")
    }else{
        const hash = bcrypt.hashSync(password, salt);
        let garden = new Garden(username);
        await setDoc(userRef, new User(username, hash));

        const newPlantRef = doc(collection(db, "plants")).withConverter(plantConverter);
        const newPlant = new Plant(newPlantRef.id)
        await setDoc(newPlantRef, newPlant);

        garden.plants = [newPlantRef.id]
        await setDoc(gardenRef, garden);
    }
}

export async function getUser(username, password) {
    const ref = doc(db, "users", username).withConverter(userConverter);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        // Convert to User object
        const user = docSnap.data();
        // Compare the user instance we just created with the password we have been given
        return bcrypt.compareSync(password, user.hash);
    } else {
        console.log("No such document!");
        return false;
    }
}

const getUsername = () => {
    const user = window.localStorage.getItem("user");
    return JSON.parse(user)
}

// Idk how to get value of gold w/ the given username
export async function getGold() {
    const ref = doc(db, "gardens", getUsername()).withConverter(gardenConverter);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        // Convert to garden object
        const garden = docSnap.data();
        // Returns the number of gold the user has
        return garden.gold;
    } else {
        console.log("No such document!");
        return null;
    }
}

export async function getPosts() {
    const querySnapshot = await getDocs(collection(db, "discussion").withConverter(postConverter));
    let postList = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        postList.push(doc.data());
    });
    postList.sort((post1, post2) => {
        return post2.timeStamp - post1.timeStamp;
    });
    return postList;
}

export async function addPost(subject, body) {
    const newPostRef = doc(collection(db, "discussion").withConverter(postConverter));
    const newPost = new DiscussionPost(getUsername(), subject, body, newPostRef.id);
    await setDoc(newPostRef, newPost);
    return newPost;
}

export async function getPost(postID){
    const postDocumentReference = doc(db, "discussion", postID).withConverter(postConverter);
    const postDocumentSnapshot = await getDoc(postDocumentReference);

    if (postDocumentSnapshot.exists()) {
        // Convert to Post object
        return postDocumentSnapshot.data();
    } else {
        console.log("No such post found in Database!");
        return false;
    }
}

export async function addReply(parentID, body){
    const newReplyRef = doc(collection(db, "discussion", parentID, "replies").withConverter(postConverter));
    const newReply = new DiscussionPost(getUsername(), "", body, newReplyRef.id);
    await setDoc(newReplyRef, newReply);

    let post = await getPost(parentID);
    if(post !== false){
        post.replies++
        const oldPostRef = doc(db, "discussion", parentID).withConverter(postConverter);
        await setDoc(oldPostRef, post);
    }

    return newReply;
}

export async function getReplies(parentID){
    const querySnapshot = await getDocs(collection(db, "discussion", parentID, "replies").withConverter(postConverter));
    let replyList = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        replyList.push(doc.data());
    });
    replyList.sort((post1, post2) => {
        return post1.timeStamp - post2.timeStamp;
    });
    return replyList;
}

export async function plantsList(){
    let plantList = [];
    // get the garden object
    const garden = await getGarden();
    // gets the plant list from the garden
    if (garden == null){
        return null;
    } for (const plantID of garden.plants) {
        let plantRef = doc(db, "plants", plantID).withConverter(plantConverter);
        const plantDoc = await getDoc(plantRef);

        if (plantDoc.exists()) {
            // Convert to plant object
            const plant = plantDoc.data();
            plantList.push(plant);
        } else {
            console.log("No such plant with id:" + plantID + "(plantsList)");
        }
    }
    return plantList
}

export async function addPlant(onlyPlantIsDead = false){
    const garden = await getGarden();
    // make some checks to verify the user should be able to purchase a plant
    if(garden.plants.length < 3 && garden.gold >= 1000){
        garden.gold -=1000;
        const newPlantRef = doc(collection(db, "plants").withConverter(plantConverter));
        const newPlant = new Plant(newPlantRef.id)
        await setDoc(newPlantRef, newPlant);
        garden.plants.push(newPlantRef.id);
        await setGarden(garden);
    }else if(onlyPlantIsDead){
        // the user has killed their only plant, and cannot afford a new one, we let them afford a new one
        garden.gold = 1000;
        await setGarden(garden);
        await addPlant()
    }else{
            alert("User has too many plants already or is too poor (hehehe poor moment) ")
    }
}

export async function removePlant(plantID){
    // we have the ID of the plant we want to remove
    // we need to delete the plant document and remove the id from the list in the garden
    const garden = await getGarden();
    const index = garden.plants.indexOf(plantID);
    if (index > -1) { // only splice array when item is found
        garden.plants.splice(index, 1); // 2nd parameter means remove one item only
        await deleteDoc(doc(db, "plants", plantID));
        await setGarden(garden);
    }else{
        console.log("Could not find that plant to delete: " + plantID)
    }
}

export async function waterPlants(){
    const plantList = await plantsList();
    const garden = await getGarden();

    const currentDate = Date.now();
    const diffLastWatered = Math.abs(currentDate - garden.lastWatered);
    const minutesSinceLastWatered = Math.round(diffLastWatered / (1000 * 60))

    if(minutesSinceLastWatered > 120){
        for(const plant of plantList){
            garden.gold += plant.water()
            const plantRef = doc(db, "plants", plant.id).withConverter(plantConverter);
            await setDoc(plantRef, plant);
        }
        garden.lastWatered = Date.now()
        await setGarden(garden);
    }else{
        alert(`Please wait 2 hours before re-watering your plants (it has been ${minutesSinceLastWatered} min)`)
    }
}

export async function getGarden(){
    const gardenRef = doc(db, "gardens", getUsername()).withConverter(gardenConverter);
    const gardenDoc = await getDoc(gardenRef);
    if (gardenDoc.exists()) {
        // Convert to garden object
        return gardenDoc.data();
    } else {
        console.log("No such document! (getGarden)");
        return null;
    }
}

export async function setGarden(garden){
    const updateGardenRef = doc(db, "gardens", getUsername()).withConverter(gardenConverter);
    await setDoc(updateGardenRef, garden);
}
