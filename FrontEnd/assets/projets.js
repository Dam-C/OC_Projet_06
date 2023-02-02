const BACKEND_URL = "http://localhost:5678/api"

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories");
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

console.log(categories);
console.log(projects);

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
    filtresButtTous.id = "0";
    filtresButtTous.classList.add("filtre-cat");
    filtresButtTous.innerText = "Tous";
    
    const projectsGallery = document.createElement("div");
    projectsGallery.classList.add("gallery");

    main.appendChild(projectsSection);
    
    projectsSection.appendChild(projectsHead);
    projectsSection.appendChild(projectsFiltresDiv);
    projectsSection.appendChild(projectsGallery);

    projectsFiltresDiv.appendChild(filtresButtTous);

    categories.forEach(category => {
        const filtreCat = document.createElement("button");
        filtreCat.id = category.id;
        filtreCat.classList.add("filtre-cat");
        filtreCat.innerText = category.name;
        projectsFiltresDiv.appendChild(filtreCat);
    });

    //génération des boutons de filtres

    const filters = document.querySelectorAll(".filtre-cat");

    filters.forEach(filterCat => {
        filterCat.addEventListener("click", ()=> {
            const filteredProjects = projects.filter(function (project) {
                return project.category.id == filterCat.id
            })
            !!+filterCat.id ? generateProjects(filteredProjects) : generateProjects(projects);
        })
    })
};

//Creation zone des projects
export function generateProjects(projects) {

    document.querySelector(".gallery").innerHTML = "";
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