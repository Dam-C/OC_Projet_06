import { genererPageLogin} from "./login.js";

//selectionne la zone principale

const categoriesAPI = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesAPI.json();

const projetsAPI = await fetch("http://localhost:5678/api/works");
const projets = await projetsAPI.json();
 

console.log(projets);
console.log(categories);

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

//creation Partie introduction
function genererIntroProjets(){

    
    //creation bloc intro
    const projetsIntroSection = document.createElement("section");
    projetsIntroSection.id = "introduction";

    const projetsIntroFigure = document.createElement("figure");
    const projetsIntroFigureImg = document.createElement("img");
    projetsIntroFigureImg.src = "./assets/images/sophie-bluel.png";
    const projetsIntroArticle = document.createElement("article");
    const projetsIntroText = "<h2>Designer d'espace</h2><p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p><p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p><p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>";
    projetsIntroArticle.innerHTML = projetsIntroText;

    main.appendChild(projetsIntroSection);
    projetsIntroSection.appendChild(projetsIntroFigure);
    projetsIntroFigure.appendChild(projetsIntroFigureImg);
    projetsIntroSection.appendChild(projetsIntroArticle);

};

function genererProjetsHead() {
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

    const projetsGallery = document.createElement("div");
    projetsGallery.classList.add("gallery");

    main.appendChild(projetsSection);
    projetsSection.appendChild(projetsHead);
    projetsSection.appendChild(projetsFiltresDiv);
    projetsFiltresDiv.appendChild(filtresButtTous);
    filtresCategories(categories);
    projetsSection.appendChild(projetsGallery);
};


//creation zone des projets
function genererProjets(){

    //creation bloc projet 
        for (let i=0 ; i < projets.length; i++) { 
        const projetsGallery = document.querySelector(".gallery");
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

//creation bloc formulaire de contact
function genererFormContact(){
        
        //creation bloc contact        
        const contactSection = document.createElement("section");
        contactSection.id = "contact";
                
        const contactHead = document.createElement("h2");
        contactHead.innerText = "Contact";
        
        const contactText = document.createElement("p");
        contactText.innerText = "Vous avez un projet ? Discutons-en !";

        const contactForm = document.createElement("form");
        contactForm.setAttribute("action", "#");
        contactForm.setAttribute("method", "post");
          
        const contactFormLabelName = document.createElement("label");
        contactFormLabelName.setAttribute("for", "name");
        contactFormLabelName.innerText = "Nom";
        const contactFormInputName = document.createElement("input");
        contactFormInputName.setAttribute("type", "text");
        contactFormInputName.setAttribute("name", "name");
        contactFormInputName.id = "name";

        const contactFormLabelEMail = document.createElement("label");
        contactFormLabelEMail.setAttribute("for", "email");
        contactFormLabelEMail.innerText = "Email";
        const contactFormInputEMail = document.createElement("input");
        contactFormInputEMail.setAttribute("type", "email");
        contactFormInputEMail.setAttribute("name", "email");
        contactFormInputEMail.id = "email";
        
        const contactFormLabelText = document.createElement("label");
        contactFormLabelText.setAttribute("for", "message");
        contactFormLabelText.innerText = "Message";
        
        const contactFormText = document.createElement("textarea");
        contactFormText.setAttribute("name", "message");
        contactFormText.id = "message";
        contactFormText.setAttribute("cols", "30");
        contactFormText.setAttribute("rows", "10");
        
        const contactFormSubmit = document.createElement("input");
        contactFormSubmit.setAttribute("type", "submit");
        contactFormSubmit.setAttribute("value", "Envoyer");
    
        main.appendChild(contactSection);
        contactSection.appendChild(contactHead);
        contactSection.appendChild(contactText);
        contactSection.appendChild(contactForm);
        contactForm.appendChild(contactFormLabelName);
        contactForm.appendChild(contactFormInputName);
        contactForm.appendChild(contactFormLabelEMail);
        contactForm.appendChild(contactFormInputEMail);
        contactForm.appendChild(contactFormLabelText);
        contactForm.appendChild(contactFormText);
        contactForm.appendChild(contactFormSubmit);

    };

genererIntroProjets();
genererProjetsHead();
genererProjets();
genererFormContact();



//Bouttons du site

let projetFiltrees = "test";

const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function () {
    main.innerHTML = "";
    genererPageLogin();
});

const navProjets = document.querySelector("#nav-projets");
navProjets.addEventListener("click", function () {
    main.innerHTML = "";
    genererIntroProjets();
    genererProjets(projets);
    genererFormContact();
});


const masterFilter = document.querySelector("#master-filter");
masterFilter.addEventListener("click", function () {
    const allProjets = projets.filter(function (projet) {
        return projet.title !== null;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(allProjets);
});

const filtreObj = document.querySelector("#filtre-1");
filtreObj.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.categorieId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsFiltres);
    console.log("test");
});