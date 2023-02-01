import { generateModalGallery } from "./modal.js";

const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories");
const categories = await categoriesAPI.json();

// Genere la partie d'ajout de photo dans la modale
export function modalAddProject () {

    document.querySelector("#modale-window").innerHTML = `
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
                <input type="file" id="upload-img-html" name="photo" accept="image/*" required></input>
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
            <button id="modale-btn-add" class="main-btn btn-add-project unfilled">Valider</button>
        </form>`
    ;

    //Generation de l'apercu de l'image à envoyer pour le projet
    function showPreview(e){
        if(e.target.files.length > 0){
            var src = URL.createObjectURL(e.target.files[0]);
            var preview = document.getElementById("show-img-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }

    document.getElementById("upload-img-html").addEventListener("change",showPreview);

    console.log();
    const data = {
        photo : null,
        titre : null,
        categorie : null
    };

    //Generation des données à envoyer à l'API
    const  formulaire = document.querySelector("#form-ajout-photo");
    formulaire.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const inputs = Array.from(e.target.elements);
        inputs.forEach(input => {
            const value = input.value;
            data[input.name]= value;
            console.dir(input)
        })
        console.log(data);
            
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

    document.querySelector("#closingX").addEventListener("click", modaleClose);   
    document.querySelector("#modale-back").addEventListener("click", generateModalGallery);
};