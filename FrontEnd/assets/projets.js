const main = document.querySelector("main");

let projets = window.localStorage.getItem("projets");

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

export function genererProjets(){
    
    //creation section projets
    const projetsSection = document.createElement("section");
    projetsSection.id = "portfolio";
    
    const projetsHead = document.createElement("h2");
    projetsHead.innerText = "Mes Projets";

    //creation filtres projets    
    const projetsFiltresDiv = document.createElement("div");
    projetsFiltresDiv.id = "filtres-container"
    const filtresButtTous = document.createElement("button");
    filtresButtTous.id = "master-filter";
    filtresButtTous.classList.add("filtre-cat");
    filtresButtTous.innerText = "Tous";
    
    function filtresCategories (categories) {
        for (let i = 0; i < categories.length; i++) {
            const filtreCat = document.createElement("button");
            filtreCat.id = `filtre-${categories[i].id}`;
            filtreCat.classList.add("filtre-cat");
            filtreCat.innerText = categories[i].name;
            projetsFiltresDiv.appendChild(filtreCat);
        };
    };

//    const filtresButtObjets = document.createElement("button");
//    filtresButtObjets.id = `filtre-${categories[0].id}`;
//    filtresButtObjets.innerText = categories[0].name;
//    const filtresButtAppart = document.createElement("button");
//    filtresButtAppart.id = `filtre-${categories[1].id}`;
//    filtresButtAppart.innerText = categories[1].name;
//    const filtresButtHetR = document.createElement("button");
//    filtresButtHetR.id = `filtre-${categories[2].id}`;
//    filtresButtHetR.innerText = categories[2].name;

    const projetsGallery = document.createElement("div");
    projetsGallery.classList.add("gallery");

    
    
    //creation bloc projet
    function genererTilesProjets(projets) {
        
        for (let i=0 ; i<projets.length; i++) { 
        const projetTile = document.createElement("figure");
        
        const projetImage = document.createElement("img");
        projetImage.src = projets[i].imageUrl;
        projetImage.setAttribute("alt", projets[i].title);
        projetImage.setAttribute("crossorigin", "anonymous");

        const projetCaption = document.createElement("figcaption");
        projetCaption.innerText = projets[i].title;

        projetsGallery.appendChild(projetTile);
        projetTile.appendChild(projetImage);
        projetTile.appendChild(projetCaption);
        };
    };

    main.appendChild(projetsSection);
    projetsSection.appendChild(projetsHead);
    projetsSection.appendChild(projetsFiltresDiv);
    projetsFiltresDiv.appendChild(filtresButtTous);
    filtresCategories(categories);
//    projetsFiltresDiv.appendChild(filtresButtObjets);
//    projetsFiltresDiv.appendChild(filtresButtAppart);
//    projetsFiltresDiv.appendChild(filtresButtHetR);
    projetsSection.appendChild(projetsGallery);

    genererTilesProjets(projets);
};
