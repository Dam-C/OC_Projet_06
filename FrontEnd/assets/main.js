import { generatePageLogin, clickLogin} from "./login.js";

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

//Creation de la zone filtres des projets
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


    //génération des boutons de filtres
    const masterFilter = document.querySelector("#master-filter");
    masterFilter.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projets);
        console.log(projets);
    });

    const filtreObj = document.querySelector("#filtre-1");
    filtreObj.addEventListener("click", function () {
        const projetsFiltres = projets.filter(function (projet) {
            return projet.category.id == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltres);
        console.log(projetsFiltres);
    });

    const filtreAppart = document.querySelector("#filtre-2");
    filtreAppart.addEventListener("click", function () {
        const projetsFiltres = projets.filter(projet => projet.category.id == 2);
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltres);
        console.log(projetsFiltres);
    });

    const filtreHetR = document.querySelector("#filtre-3");
    filtreHetR.addEventListener("click", function () {
        const projetsFiltres = projets.filter(function (projet) {
            return projet.category.id == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererProjets(projetsFiltres);
        console.log(projetsFiltres);
    });
};

//Creation zone des projets
function genererProjets(projets) {

    //creation bloc projet 
        for (let i=0 ; i < projets.length; i++) { 
        
        const projetsGallery = document.querySelector(".gallery");

        const projet = projets[i];

        const projetTile = document.createElement("figure");
        projetTile.dataset.id = projets[i].id;
        projetTile.dataset.cat = projets[i].categoryId;
        
        const projetImage = document.createElement("img");
        projetImage.src = projet.imageUrl;
        projetImage.setAttribute("alt", projet.title);
        projetImage.setAttribute("crossorigin", "anonymous");

        const projetCaption = document.createElement("figcaption");
        projetCaption.innerText = projet.title;

        projetsGallery.appendChild(projetTile);
        projetTile.appendChild(projetImage);
        projetTile.appendChild(projetCaption);

    };
};

//Creation bloc formulaire de contact
function genererFormContact(){
        
        //creation bloc contact        
        const contactSection = document.createElement("section");
        contactSection.id = "contact";

        const contactTextBloc = `<h2>Contact</h2><p>Vous avez un projet ? Discutons-en !</p><form action="#" method="post"><label for="name">Nom</label><input type="text" name="name" id="name"><label for="email">Email</label><input type="email" name="email" id="email"><label for="message">Message</label><textarea name="message" id="message" cols="30" rows="10"></textarea><input type="submit" value="Envoyer"></form></section>`;

        contactSection.innerHTML = contactTextBloc;
        main.appendChild(contactSection);

        /*
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
        */
    };

    genererIntroProjets();
    genererProjetsHead();
    genererProjets(projets);
    genererFormContact();

//Bouttons du site
const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function (event) {
    event.preventDefault();
    main.innerHTML = "";
    generatePageLogin();
});

const navContact = document.querySelector("#nav-contact");
navContact.addEventListener("click", function (event) {
    event.preventDefault();
    main.innerHTML = "";
    genererFormContact();
});

const navProjets = document.querySelector("#nav-projets");
navProjets.addEventListener("click", function (event) {
    event.preventDefault();
    main.innerHTML = "";
    genererIntroProjets();
    genererProjetsHead();
    genererProjets(projets);
    genererFormContact();
});

function callModale () {

}

