const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories")
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

console.log(categories)

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
            <label id="upload-img-area">
                <div id="img-preview-area">
                    <img id="show-img-preview">
                </div>
                <i class="fa-regular fa-image"></i>
                <span id="upload-img-btn">+ Ajouter photo</span>
                <input type="file" id="upload-img-html" accept="image/*" onchange="showPreview(event);"></input>
                <span class="upload-img-subtxt">jpg, png : 4mo max</span>
            </label>
            <label for="titre">Titre</label>
            <input type="text" name="titre" id="modale-add-title">
            <label for="categorie">Catégorie</label>
            <select name="categorie" id="modale-add-category" data-dashlane-rid="38f416d00215ea44" data-form-type="other">
                <option></option>
                <option value="${categories[0].name}">${categories[0].name}</option>
                <option value="${categories[1].name}">${categories[1].name}</option>
                <option value="${categories[2].name}">${categories[2].name}</option>
            </select>
            <div class="modale-separator"></div>
            <input type="submit" id="modale-btn-valid" value="Envoyer">
        </form>`;

/**
 * Create an arrow function that will be called when an image is selected.
 */
const showPreview = (event) => {
    /**
     * Get the selected files.
     */
    const imageFiles = event.target.files;
    /**
     * Count the number of files selected.
     */
    const imageFilesLength = imageFiles.length;
    /**
     * If at least one image is selected, then proceed to display the preview.
     */
    if (imageFilesLength > 0) {
        /**
         * Get the image path.
         */
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        /**
         * Select the image preview element.
         */
        const imagePreviewElement = document.querySelector("#show-img-preview");
        /**
         * Assign the path to the image preview element.
         */
        imagePreviewElement.src = imageSrc;
        /**
         * Show the element by changing the display value to "block".
         */
        imagePreviewElement.style.display = "block";
    }
};

    const modaleClose = () => document.querySelector("#modale-bg").remove();
    let modaleCloseIcon = document.querySelector("#closingX");
    modaleCloseIcon.addEventListener("click", modaleClose);   

    const modaleBackeIcon = document.querySelector("#modale-back");
    modaleBackeIcon.addEventListener("click", generateModaleGallery);

};