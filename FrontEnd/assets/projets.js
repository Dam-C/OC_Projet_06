const BACKEND_URL = "http://localhost:5678/api";

// const categoriesAPI = await (await fetch(BACKEND_URL + "/categories")).json();
const categoriesAPI = await fetch(BACKEND_URL + "/categories");
const categories = await categoriesAPI.json();

const projectsAPI = await fetch(BACKEND_URL + "/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

//Creation de la zone filtres des projects
export function generateProjectsHead() {
    //creation section projects
    const projectsSection = document.createElement("section");
    projectsSection.id = "portfolio";
    projectsSection.innerHTML = `
        <h2>Mes projets</h2>
        <div id="filtres-container">
            <button id="0" class="filtre-cat">Tous</button>
        </div>
        <div class="gallery"></div>
        `;

    main.appendChild(projectsSection);
    
    categories.forEach(category => {

        const filtreCat = document.createElement("button");
        filtreCat.id = category.id;
        filtreCat.classList.add("filtre-cat");
        filtreCat.innerText = category.name;
        document.querySelector("#filtres-container").appendChild(filtreCat);
    });

    //génération des boutons de filtres
    const filtersBtns = document.querySelectorAll(".filtre-cat");

    filtersBtns.forEach(filterCat => {
        filterCat.addEventListener("click", ()=> {

            const filteredProjects = projects.filter((project)=> {return project.category.id == filterCat.id});
            !!+filterCat.id ? generateProjects(filteredProjects) : generateProjects(projects);
        });
    });
};

//Creation des projects dans la gallerie
export function generateProjects(projects) {

    document.querySelector(".gallery").innerHTML = "";
    projects.forEach(project => {

        const projectsGallery = document.querySelector(".gallery");
        const projectTile = document.createElement("figure");
        projectTile.dataset.id = project.id;
        projectTile.dataset.cat = project.categoryId;
        projectTile.innerHTML = `<img src="${project.imageUrl}" alt="${project.title}" crossorigin="anonymous"></img><figcaption>${project.title}</figcaption>`;
        projectsGallery.appendChild(projectTile);
    });
};