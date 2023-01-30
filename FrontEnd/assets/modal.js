import { modalAddProject } from "./modal-add-project.js";



const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories")
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

export function callModal () {
    const modalBackGround = document.createElement("div")
    modalBackGround.id = `modale-bg`;
    main.prepend(modalBackGround);
    generateModalGallery();
}

export function generateModalGallery () {
    document.querySelector(`#modale-bg`)
        .innerHTML = `
        <div id="modale-window">
            <i id="closingX" class="fa-solid fa-xmark"></i>
            <h4 id="modale-title">Galerie photo</h4>
            <div id="miniatures"></div>
            <div class="modale-separator"></div>
            <button id="modale-btn">Ajouter une photo</button>
            <p id="modale-suppr">Supprimer la galerie</p>
        </div>`;


    //creation bloc project dans la modale
    function generateModalProjects(projects) {

        projects.forEach(project => {
            
            const miniTile = document.createElement("div");
            miniTile.dataset.id = `minitaure-${project.id}`;
            miniTile.classList.add("miniature")
            miniTile.innerHTML = `
            <figure id="modale-mini-fig-${project.id}" class="miniature-fig">
                <img src="${project.imageUrl}" crossorigin="anonymous">
                <i class="fa-solid fa-arrows-up-down-left-right"></i><i id="trash-${project.id}" type="button" class="fa-solid fa-trash-can"></i>
            </figure>
            <p>éditer</p>
            `;
    
            document.querySelector("#miniatures").appendChild(miniTile);

            // Fonction de suppression de projet à l'intérieur de la modale
            document.querySelector(`#trash-${project.id}`)
                .addEventListener("click", async (e)=> {
                    
                    await fetch(`${BACKEND_URL}/works/${project.id}`, {
                        method : "DELETE",
                        headers: {
                            Authorization:`Bearer ${localStorage.tokenID}`,
                            "accept": "application/json"
                        },
                    });
                });
        });
    };

    generateModalProjects(projects);
    
    document.querySelector("#closingX").addEventListener("click", ()=> { 
        document.querySelector("#modale-bg").remove()});   

    document.querySelector("#modale-btn").addEventListener("click", modalAddProject)
};

