const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories")
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");


export function callModale () {
    
    const modaleBackGround = document.createElement("div")
        modaleBackGround.id = "modale-bg";
        main.prepend(modaleBackGround);
        generateModaleGallery();
}



function generateModaleGallery () {
    document.querySelector("#modale-bg")
        .innerHTML = `
        <div id="modale-window">
            <i id="closingX" class="fa-solid fa-xmark"></i>
            <h4 id="modale-title">Galerie photo</h4>
            <div id="miniatures"></div>
            <div class="modale-separator"></div>
            <button id="modale-btn">Ajouter une photo</button>
            <p id="modale-suppr">Supprimer la galerie</p>
        </div>`;

    const modaleContent = document.querySelector("#modale-window");

    //creation bloc project dans la modale
    function generateModaleProjects(projects) {

        projects.forEach(project => {

            const modaleMiniGallery = document.querySelector("#miniatures");
            
            const miniTile = document.createElement("div");
            miniTile.dataset.id = `minitaure-${project.id}`;
            miniTile.classList.add("miniature")
            miniTile.innerHTML = `<figure id="modale-mini-fig-${project.id}" class="miniature-fig"><img src="${project.imageUrl}" crossorigin="anonymous"><i class="fa-solid fa-arrows-up-down-left-right"></i><i id="trash-${project.id}" class="fa-solid fa-trash-can"></i></figure><p>éditer</p>`
        
            modaleMiniGallery.appendChild(miniTile);
        })
    };

    generateModaleProjects(projects);
    
    const modaleClose = () => document.querySelector("#modale-bg").remove();
    let modaleCloseIcon = document.querySelector("#closingX");
    modaleCloseIcon.addEventListener("click", modaleClose);   

    let modaleAddProjectBtn = document.querySelector("#modale-btn");
    modaleAddProjectBtn.addEventListener("click", modaleAddProject)
};


    // Genere la partie d'ajout de photo dans la modale
function modaleAddProject () {

    const modaleContent = document.querySelector("#modale-window");
    modaleContent.innerHTML = `
        <div id="modale-nav-icons">
            <i id="modale-back" class="fa-solid fa-arrow-left"></i><i id="closingX" class="fa-solid fa-xmark"></i>
        </div>
        <h4 id="modale-title">Ajout photo</h4>

        <form id="form-ajout-photo" action="#" method="post">
            <div>
                <i class="fa-regular fa-image"></i>
                <button>+ Ajouter photo</button>
                <span>jpg, png : 4mo max</span>
            </div>
            <label for="titre">Titre</label>
            <input type="text" name="titre" id="modale-add-title">
            <label for="categorie">Catégorie</label>
            <select type="email" name="email" id="modale-add-category">
            <label for="message">Message</label><textarea name="message" id="message" cols="30" rows="10"></textarea>
            <div class="modale-separator"></div>
            <input type="submit" id="modale-btn-valid" value="Envoyer">
        </form>`;

    const modaleClose = () => document.querySelector("#modale-bg").remove();
    let modaleCloseIcon = document.querySelector("#closingX");
    modaleCloseIcon.addEventListener("click", modaleClose);   

    const modaleBackeIcon = document.querySelector("#modale-back");
    modaleBackeIcon.addEventListener("click", generateModaleGallery);

};