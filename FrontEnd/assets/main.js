import { generateEditionMode } from "./editionMode.js";
import { generateProjectsHead, generateProjects } from "./projets.js";
import { generateIntroProjects } from "./intro.js";



// Fichiers de l'API

// const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });

const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories");
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

// let figure = document.createElement("figure"); // is it needed ?

function createImage(attr){ //Attr is an object with all attributes needed
    const img = document.createElement('img');
    img.src = attr.src
    img.id = attr.id;

    return img
}

//Creation bloc formulaire de contact
function generateFormContact(){
        
    //creation bloc contact        
    const contactSection = document.createElement("section");
    contactSection.id = "contact";
    contactSection.innerHTML = `
        <h2>Contact</h2>
        <p>Vous avez un project ? Discutons-en !</p>
            <form action="#" method="post"><label for="name">Nom</label>
                <input type="text" name="name" id="name">
                <label for="email">Email</label>
                <input type="email" name="email" id="email">
                <label for="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
                <button type="submit" class="main-btn" value="Envoyer">Envoyer</button>
            </form>`
    ;
    main.appendChild(contactSection);

};

//Bouttons du site

document.querySelector("#nav-contact").addEventListener("click", ()=> {
    main.innerHTML = "";
    generateFormContact();
});

document.querySelector("#nav-projets").addEventListener("click",()=> {
    main.innerHTML = "";
    generateMainPage();
});



// Generation de la page principale
export function generateMainPage () {
    generateIntroProjects();
    generateProjectsHead();
    generateProjects(projects);
    generateFormContact();
};

generateMainPage();

if (localStorage.tokenID) {
    generateEditionMode();
}