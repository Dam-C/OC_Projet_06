//Vidage du localeStorage pour les besoins de la construction du site
localStorage.clear();
// Fichiers de l'API
const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();
const projectsAPI = await fetch("http://localhost:5678/api/works");
const projects = await projectsAPI.json();

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

console.log(projects);
console.log(categories);

//creation Partie introduction
function generateIntroprojects(){

    //creation bloc intro
    const projectsIntroSection = document.createElement("section");
    projectsIntroSection.id = "introduction";

    const projectsIntroFigure = document.createElement("figure");
    projectsIntroFigure.id = "intro-figure"
    const projectsIntroFigureImg = document.createElement("img");
    projectsIntroFigureImg.src = "./assets/images/sophie-bluel.png";
    const projectsIntroArticle = document.createElement("article");
    projectsIntroArticle.id = "intro-article"
    const projectsIntroText = "<h2>Designer d'espace</h2><p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p><p>Chaque project sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p><p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>";
    projectsIntroArticle.innerHTML = projectsIntroText;

    main.appendChild(projectsIntroSection);
    projectsIntroSection.appendChild(projectsIntroFigure);
    projectsIntroFigure.appendChild(projectsIntroFigureImg);
    projectsIntroSection.appendChild(projectsIntroArticle);
  //  }
};

//Creation de la zone filtres des projects
function generateprojectsHead() {
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
    
    function filtresCategories (categories) {
        for (let i = 0; i < categories.length; i++) {
            const filtreCat = document.createElement("button");
            filtreCat.id = `filtre-${categories[i].id}`;
            filtreCat.classList.add("filtre-cat");
            filtreCat.innerText = categories[i].name;
            projectsFiltresDiv.appendChild(filtreCat);
        };
    };

    const projectsGallery = document.createElement("div");
    projectsGallery.classList.add("gallery");

    main.appendChild(projectsSection);
    projectsSection.appendChild(projectsHead);
    projectsSection.appendChild(projectsFiltresDiv);
    projectsFiltresDiv.appendChild(filtresButtTous);
    filtresCategories(categories);
    projectsSection.appendChild(projectsGallery);


    //génération des boutons de filtres
    const masterFilter = document.querySelector("#master-filter");
    masterFilter.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".gallery").innerHTML = "";
        generateprojects(projects);
        console.log(projects);
    });

    const filtreObj = document.querySelector("#filtre-1");
    filtreObj.addEventListener("click", function () {
        const projectsFiltres = projects.filter(function (project) {
            return project.category.id == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateprojects(projectsFiltres);
        console.log(projectsFiltres);
    });

    const filtreAppart = document.querySelector("#filtre-2");
    filtreAppart.addEventListener("click", function () {
        const projectsFiltres = projects.filter(project => project.category.id == 2);
        document.querySelector(".gallery").innerHTML = "";
        generateprojects(projectsFiltres);
        console.log(projectsFiltres);
    });

    const filtreHetR = document.querySelector("#filtre-3");
    filtreHetR.addEventListener("click", function () {
        const projectsFiltres = projects.filter(function (project) {
            return project.category.id == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateprojects(projectsFiltres);
        console.log(projectsFiltres);
    });
};

//Creation zone des projects
function generateprojects(projects) {

    //creation bloc project 
        for (let i=0 ; i < projects.length; i++) { 
        
        const projectsGallery = document.querySelector(".gallery");

        const project = projects[i];

        const projectTile = document.createElement("figure");
        projectTile.dataset.id = projects[i].id;
        projectTile.dataset.cat = projects[i].categoryId;
        
        const projectImage = document.createElement("img");
        projectImage.src = project.imageUrl;
        projectImage.setAttribute("alt", project.title);
        projectImage.setAttribute("crossorigin", "anonymous");

        const projectCaption = document.createElement("figcaption");
        projectCaption.innerText = project.title;

        projectsGallery.appendChild(projectTile);
        projectTile.appendChild(projectImage);
        projectTile.appendChild(projectCaption);

    };
};

//Creation bloc formulaire de contact
function generateFormContact(){
        
        //creation bloc contact        
        const contactSection = document.createElement("section");
        contactSection.id = "contact";

        contactSection.innerHTML = `<h2>Contact</h2><p>Vous avez un project ? Discutons-en !</p><form action="#" method="post"><label for="name">Nom</label><input type="text" name="name" id="name"><label for="email">Email</label><input type="email" name="email" id="email"><label for="message">Message</label><textarea name="message" id="message" cols="30" rows="10"></textarea><input type="submit" value="Envoyer"></form></section>`;
        main.appendChild(contactSection);

    };


// Generation de la page principale
    generateIntroprojects();
    generateprojectsHead();
    generateprojects(projects);
    generateFormContact();

//Bouttons du site
const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function (event) {
    event.preventDefault();
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
navContact.addEventListener("click", function (event) {
    event.preventDefault();
    main.innerHTML = "";
    generateFormContact();
});

const navprojects = document.querySelector("#nav-projets");
navprojects.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.tokenID) {
        generateEditionMode();
    } else {
    main.innerHTML = "";
    generateIntroprojects();
    generateprojectsHead();
    generateprojects(projects);
    generateFormContact();
    }
});






function generatePageLogin(){
        
    //creation bloc Login
    const loginSection = document.createElement("section");
    loginSection.id = "login";

    const loginHTML = `<article class="login__container"><h2>Log In</h2><form class="login__fields"><label for="email-login">E-mail</label><input type="email" name="email-login" id="email-login"><label for="mdp-login">Mot de passe</label><input type="password" name="mdp-login" id="mdp-login"><button type="button" id="btn-login" value="Se connecter">Se connecter</button><input type="mdp-forgot" value="Mot de passe oublié"></form></article>`;
    
    loginSection.innerHTML = loginHTML;
    main.appendChild(loginSection);
    
    const loginBtn = document.querySelector("#btn-login")
        .addEventListener("click", async function () {

        const loginMail = document.querySelector("#email-login").value;
        const loginPass = document.querySelector("#mdp-login").value;

        const loginIDS = {
            email: loginMail,
            password: loginPass,
        };

        const loginReqIDS = JSON.stringify(loginIDS);

        const r = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: loginReqIDS
        })

        const token = await r.json();
        console.log(token);
         if (r.ok === true) {
            alert("Connexion réussie");
            const body = document.querySelector("body");
            const headerEM = document.createElement("div");
            headerEM.id = "top-edit-mode-container";
            headerEM.innerHTML = `<div id="top-edit-mode"><i class="fa-regular fa-pen-to-square"></i> Mode édition<button>publier les changements</button></div>`;

    body.prepend(headerEM);
            localStorage.setItem("tokenID", token.token);
            generateEditionMode();
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    });
};

function generateEditionMode () {

    main.innerHTML = "";
    generateIntroprojects();
    generateprojectsHead();
    generateprojects(projects);
    generateFormContact();

    // EM = Edition Mode
    // Génère les élements associés à l'édition du site
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

    const btnModale = document.querySelector("#modif-portfolio")
    btnModale.addEventListener("click", function callModale() {
        console.log("testmodale");
        const modaleBackGround = document.createElement("div")
        modaleBackGround.id = "modale-bg";
        modaleBackGround.innerHTML = `<div id="modale-window"><div id="modale-nav-icons"><i id="closingX" class="fa-solid fa-xmark"></i></div><h4 id="modale-title">Galerie photo</h4><div id="miniatures"></div><div class="modale-separator"></div><button id="modale-btn">Ajouter une photo</button><p id="modale-suppr">Supprimer la galerie</p></div>`;

        main.prepend(modaleBackGround);

        
        function generateModaleProjects(projects) {

            //creation bloc project 
                for (let i=0 ; i < projects.length; i++) { 
                
                const modaleMiniGallery = document.querySelector("#miniatures");
        
                const mini = projects[i];
        
                const miniTile = document.createElement("div");
                miniTile.dataset.id = `minitaure-${projects[i].id}`;
                miniTile.classList.add("miniature")
                miniTile.innerHTML = `<figure id="modale-mini-fig-${projects[i].id}" class="miniature-fig"><img src="${mini.imageUrl}" crossorigin="anonymous"><i class="fa-solid fa-arrows-up-down-left-right"></i><i id="trash-${projects[i].id}" class="fa-solid fa-trash-can"></i></figure><p>éditer</p>`
         
        
                modaleMiniGallery.appendChild(miniTile);
        
            };
        };

        generateModaleProjects(projects)

        const modaleContent = document.querySelector("#modale-window");

        const modaleClose = document.querySelector("#closingX");
        modaleClose.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector("#modale-bg").remove();
        })

        const modaleAddProject = document.querySelector("#modale-btn");
        modaleAddProject.addEventListener("click", function (e) {
            e.preventDefault();
            modaleContent.innerHTML = "";
            modaleContent.innerHTML = `<div id="modale-nav-icons"><i id="modale-back" class="fa-solid fa-arrow-left"></i><i id="closingX" class="fa-solid fa-xmark"></i></div><h4 id="modale-title">Ajout photo</h4>
            
            <form action="#" method="post">
            
            <label for="titre">Titre</label>
            <input type="text" name="titre" id="modale-add-title">
            
            <label for="categorie">Catégorie</label>
            <select type="email" name="email" id="modale-add-category">
            
            <label for="message">Message</label>
            <textarea name="message" id="message" cols="30" rows="10"></textarea>
            <div class="modale-separator"></div>
            <input type="submit" id="modale-btn-valid" value="Envoyer"></form>
            
            `;
        })

        const backToModale1 = document.querySelector("#modale-back") ;
    });

}