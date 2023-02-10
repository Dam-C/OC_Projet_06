import { modalAddProject } from "./modal-add-project.js";

const BACKEND_URL = "http://localhost:5678/api";

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

// ancre pour la fenêtre modale
const modalRoot = document.querySelector("#modal-root");

export function callModal () {
    modalRoot.innerHTML = `<div id="modale-bg"></div>`;
    generateModalGallery();
};

export function generateModalGallery () {
    document.querySelector(`#modale-bg`)
        .innerHTML = `
        <div id="modale-window">
            <i id="closingX" class="fa-solid fa-xmark"></i>
            <h4 id="modale-title">Galerie photo</h4>
            <div id="miniatures"></div>
            <div class="modale-separator"></div>
            <button id="modal-btn" class="main-btn">Ajouter une photo</button>
            <p id="modale-suppr">Supprimer la galerie</p>
        </div>`;

    //creation bloc project dans la modale
    function generateModalProjects(projects) {

        projects.forEach(project => {
            
            const miniTile = document.createElement("div");
            miniTile.dataset.id = `miniature-${project.id}`;
            miniTile.classList.add("miniature")
            miniTile.innerHTML = `
            <figure id="modale-mini-fig-${project.id}" class="miniature-fig">
                <img src="${project.imageUrl}" crossorigin="anonymous">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <i id="trash-${project.id}" type="button" class="fa-solid fa-trash-can"></i>    
            </figure>
            <p>éditer</p>
            `;
    
            document.querySelector("#miniatures").appendChild(miniTile);

            // Fonction de suppression de projet à l'intérieur de la modale
            document.querySelector(`#trash-${project.id}`)
                .addEventListener("click", async (e)=> {
                    
                    const response = await fetch(`${BACKEND_URL}/works/${project.id}`, {
                        method : "DELETE",
                        headers: {
                            Authorization:`Bearer ${localStorage.tokenID}`,
                            "accept": "application/json"
                        },
                    });
                    if (response.ok) {
                        alert("Projet supprimé");
                    } else {
                        alert("Le projet n'a pas pu être supprimé");
                    }
                });
        });
    };

    generateModalProjects(projects);
    
    document.querySelector("#closingX").addEventListener("click", ()=> { 
        document.querySelector("#modale-bg").remove()});   

    document.querySelector("#modal-btn").addEventListener("click", modalAddProject);

    // Gestion de la fermeture de la modal
    // Click sur le fond pour fermer la modal
    modalRoot.addEventListener("click",() => {
        document.querySelector("#modale-bg").remove();
    });

    // Permet d'empecher la fermeture de la modal au clic
    document.querySelector("#modale-window").addEventListener("click", (e)=> {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
};