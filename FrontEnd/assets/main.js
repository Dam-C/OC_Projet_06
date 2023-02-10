// Importation des fontionnalités de d'édition du site
import { generateEditionMode } from "./editionMode.js";
import { generateProjectsHead, generateProjects } from "./projets.js";
import { generateIntroProjects } from "./intro.js";

const BACKEND_URL = "http://localhost:5678/api"

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

// Selectionne la zone HTML principale dans laquelle le code va se générer
const main = document.querySelector("main");

// Creation bloc formulaire de contact
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
            </form>`;
    main.appendChild(contactSection);
};

// Bouttons du site
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

// Permet de conserver les fonctionnalités d'édition à la fermeture du site tant que l'utilisateur ne s'est pas déconnecté avec le bouton "Logout"
if (localStorage.tokenID) {
    generateEditionMode();
}