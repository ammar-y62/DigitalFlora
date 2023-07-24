import db from "./firebase_init";

const gardenList = document.querySelector('#garden-list');
const form = document.querySelector('#add-garden-form');

//create element and render cafe
function renderGarden(doc){
    // eslint-disable-next-line no-undef
    let temp = new Garden();
    let li = document.createElement('li');
    let garden = document.setAttribute(garden);

    li.setAttribute('data-id', doc.id);
    garden.textContent = doc.data().garden;

    li.appendChild(garden);

    gardenList.appendChild(li);
}

db.collection('garden').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
    })
})

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('garden').add({
        garden: form.garden.value
    })
})
