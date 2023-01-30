const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories");
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");



//Creation de la zone filtres des projects
export function generateProjectsHead() { // naming !!
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
    
    function displayBtnCategories () {
        
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
    displayBtnCategories(categories);


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
export function generateProjects(projects) {

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
