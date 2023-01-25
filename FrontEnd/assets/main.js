import { callModale } from "./modale.js";
import { generatePageLogin } from "./login.js";


//Vidage du localeStorage pour les besoins de la construction du site
//localStorage.clear();

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

//creation Partie introduction
function generateIntroProjects(){ //naming !! in camel case should be generateIntroProjects 

    //creation bloc intro
    const projectsIntroSection = document.createElement("section");
    projectsIntroSection.id = "introduction";

    const projectsIntroFigure = document.createElement("figure");
    projectsIntroFigure.id = "intro-figure"

    const projectsIntroFigureImg = document.createElement("img");
    projectsIntroFigureImg.src = "./assets/images/sophie-bluel.png";

    // refactor ?
    // const img = createImage({src: "./assets/images/sophie-bluel.png", id: "idImage"})

    const projectsIntroArticle = document.createElement("article");
    projectsIntroArticle.id = "intro-article"
    const projectsIntroText = `
    <h2>Designer d'espace</h2>
    <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
    <p>Chaque project sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
    <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
    `;
    projectsIntroArticle.innerHTML = projectsIntroText;

    main.appendChild(projectsIntroSection);
    projectsIntroSection.appendChild(projectsIntroFigure);
    projectsIntroFigure.appendChild(projectsIntroFigureImg);
    projectsIntroSection.appendChild(projectsIntroArticle);
};

//Creation de la zone filtres des projects
function generateProjectsHead() { // naming !!
    //creation section projects
    const projectsSection = document.createElement("section");
    projectsSection.id = "portfolio";
    
    const projectsHead = document.createElement("h2");
    projectsHead.innerText = "Mes projets";

    //creation filtres projects    
    const projectsFiltresDiv = document.createElement("div");
    projectsFiltresDiv.id = "filtres-container"
    const filtresButtTous = document.createElement("button");
    filtresButtTous.id = "master-filter";
    filtresButtTous.classList.add("filtre-cat");
    filtresButtTous.innerText = "Tous";
    
    function filtresCategories (category) { // displayBtnCategories naming for i.e
        
        categories.forEach(category => {
            const filtreCat = document.createElement("button");
            filtreCat.id = `filtre-${category.id}`;
            filtreCat.classList.add("filtre-cat");
            filtreCat.innerText = category.name;
            projectsFiltresDiv.appendChild(filtreCat);
        });
    };

    const projectsGallery = document.createElement("div");
    projectsGallery.classList.add("gallery");

    main.appendChild(projectsSection);
    
    projectsSection.appendChild(projectsHead);
    projectsSection.appendChild(projectsFiltresDiv);
    projectsSection.appendChild(projectsGallery);

    projectsFiltresDiv.appendChild(filtresButtTous);
    filtresCategories(categories);


    //génération des boutons de filtres
    //@TODO : create a single function to handle filters
    const masterFilter = document.querySelector("#master-filter");

    masterFilter.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".gallery").innerHTML = "";
        generateProjects(projects);
    });

    const filtreObj = document.querySelector("#filtre-1");
    filtreObj.addEventListener("click", function () {
        const projectsFiltres = projects.filter(function (project) {
            return project.category.id == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateProjects(projectsFiltres);
    });

    const filtreAppart = document.querySelector("#filtre-2");
    filtreAppart.addEventListener("click", function () {
        const projectsFiltres = projects.filter(project => project.category.id == 2);
        document.querySelector(".gallery").innerHTML = "";
        generateProjects(projectsFiltres);
    });

    const filtreHetR = document.querySelector("#filtre-3");
    filtreHetR.addEventListener("click", function () {
        const projectsFiltres = projects.filter(function (project) {
            return project.category.id == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateProjects(projectsFiltres);
    });
};

//Creation zone des projects
function generateProjects(projects) {

    //creation bloc project 
    projects.forEach(project => {

        const projectsGallery = document.querySelector(".gallery");
        const projectTile = document.createElement("figure");
        projectTile.dataset.id = project.id;
        projectTile.dataset.cat = project.categoryId;
        projectTile.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}" crossorigin="anonymous"></img><figcaption>${project.title}</figcaption>`;

        projectsGallery.appendChild(projectTile);
    });
};

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
            <input type="submit" value="Envoyer">
        </form>
    </section>`
    ;
    main.appendChild(contactSection);

};

// Generation de la page principale
function generateMainPage () {
        generateIntroProjects();
        generateProjectsHead();
        generateProjects(projects);
        generateFormContact();
};

generateMainPage ();

//Bouttons du site
const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function (event) {
    if(localStorage.tokenID) {
        localStorage.clear();
        const loginLogout = document.querySelector("#nav-login");
        loginLogout.innerText = "Login";
        document.querySelector("#top-edit-mode-container").remove();
        document.querySelector("#modif-figure").remove();
        document.querySelector("#modif-intro").remove();
        document.querySelector("#modif-portfolio").remove();
    } else {
        main.innerHTML = "";
        generatePageLogin();
        }
});

const navContact = document.querySelector("#nav-contact");
navContact.addEventListener("click", function () {
    main.innerHTML = "";
    generateFormContact();
});

const navprojects = document.querySelector("#nav-projets");
navprojects.addEventListener("click", function () {

    if (localStorage.tokenID) {
        generateEditionMode();
    } else {
    main.innerHTML = "";

    generateMainPage();
}
});

export function generateEditionMode () {

    main.innerHTML = "";
    generateMainPage();

    // EM = Edition Mode - Génère les boutons d'édition du site
    const loginLogout = document.querySelector("#nav-login");
    loginLogout.innerText = "Logout";
    const introFigureEM = document.querySelector("#intro-figure");
    const introArticleEM = document.querySelector("#introduction article");
    const projectsEM = document.querySelector("#portfolio");

    const modifFigure = document.createElement("p");
    modifFigure.id = "modif-figure";
    modifFigure.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`
    const modifIntro = document.createElement("p");
    modifIntro.id = "modif-intro";
    modifIntro.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`
    const modifPortfolio = document.createElement("div");
    modifPortfolio.id = "modif-portfolio";
    modifPortfolio.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`

    introFigureEM.appendChild(modifFigure);
    introArticleEM.prepend(modifIntro);
    projectsEM.prepend(modifPortfolio);

    // Génération de la modale permettant d'ajouter ou retirer des projets
    const btnModale = document.querySelector("#modif-portfolio")
    btnModale.addEventListener("click", callModale)
};