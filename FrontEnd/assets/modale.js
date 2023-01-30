import { generateEditionMode } from "./main.js";

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
        modaleBackGround.id = `modale-bg`;
        main.prepend(modaleBackGround);
        generateModaleGallery();


//        const modaleClose = () => document.querySelector("#modale-bg").remove();
//        modaleBackGround.addEventListener("click", modaleClose);
}

function generateModaleGallery () {
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

    const modaleContent = document.querySelector("#modale-window");

    //creation bloc project dans la modale
    function generateModaleProjects(projects) {

        projects.forEach(project => {

            const modaleMiniGallery = document.querySelector("#miniatures");
            
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
    
            modaleMiniGallery.appendChild(miniTile);

            // Fonction de suppression de projet à l'intérieur de la modale
            document.querySelector(`#trash-${project.id}`)
                .addEventListener("click", async (e)=> {
                    console.log("delete");
                    
                   /* const r = await fetch(`${BACKEND_URL}/works/${project.id}`, {
                        method : "DELETE",
                        headers: {
                            Authorization:`Bearer ${localStorage.tokenID}`,
                            "accept": "application/json"
                        },
                    }); */
      //              modaleClose();
        //            generateEditionMode();
                });
        });
    };

    generateModaleProjects(projects);
    
    const modaleClose = () => document.querySelector("#modale-bg").remove();
    let modaleCloseIcon = document.querySelector("#closingX")
        .addEventListener("click", modaleClose);   

    let modaleAddProjectBtn = document.querySelector("#modale-btn")
        .addEventListener("click", modaleAddProject)
};

    // Genere la partie d'ajout de photo dans la modale
function modaleAddProject () {

    const modaleContent = document.querySelector("#modale-window").innerHTML = `
        <div id="modale-nav-icons">
            <i id="modale-back" class="fa-solid fa-arrow-left"></i><i id="closingX" class="fa-solid fa-xmark"></i>
        </div>
        <h4 id="modale-title">Ajout photo</h4>

        <form id="form-ajout-photo" enctype="multipart/form-data" action="#" method="post">
            <div id="upload-img-area">
                <div id="img-preview-area">
                    <img id="show-img-preview">
                </div>
                <i class="fa-regular fa-image"></i>
                <label for="upload-img-html" id="upload-img-btn">+ Ajouter photo</label>
                <input type="file" id="upload-img-html" accept="image/*" required></input>
                <span class="upload-img-subtxt">jpg, png : 4mo max</span>
            </div>            
            <label for="titre">Titre</label>
            <input type="text" name="titre" id="new-project-title" required>
            <label for="categorie">Catégorie</label>
            <select name="categorie" id="modale-add-category" required>
                <option></option>
                <option value="${categories[0].id}">${categories[0].name}</option>
                <option value="${categories[1].id}">${categories[1].name}</option>
                <option value="${categories[2].id}">${categories[2].name}</option>
            </select>
            <div class="modale-separator"></div>
            <button type="button" id="modale-btn-valid" value="Valider">Valider</button>
        </form>`
    ;

    //Generation de l'apercu de l'image à envoyer pour le projet
    function showPreview(event){
        if(event.target.files.length > 0){
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("show-img-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }

    const btnUploadImg = document.getElementById("upload-img-html");
    btnUploadImg.addEventListener("change",showPreview);

    //Generation des données à envoyer à l'API
    const sendProjectToApi = document.querySelector("#modale-btn-valid")
        .addEventListener("click", async (e)=>{
        
            e.preventDefault();
            const formData = new FormData();
            formData.append("image",document.querySelector("#upload-img-html").files[0]);
            formData.append("title",document.querySelector("#new-project-title").value);
            formData.append("category",document.querySelector("#modale-add-category").value);

            const r = await fetch(`${BACKEND_URL}/works`, {
                method : "POST",
                body : formData,
                headers: {
                    Authorization:`Bearer ${localStorage.tokenID}`,
                    "accept": "application/json"
                }
            })

            if (r.ok === true) {
                alert("projet ajouté avec succés");
                generateEditionMode();
            } else {
                alert("Le projet n'a pas pu être ajouté");
            }
        });

    const modaleClose = () => document.querySelector("#modale-bg").remove();
    let modaleCloseIcon = document.querySelector("#closingX")
        .addEventListener("click", modaleClose);   

    const modaleBackeIcon = document.querySelector("#modale-back")
        .addEventListener("click", generateModaleGallery);
};