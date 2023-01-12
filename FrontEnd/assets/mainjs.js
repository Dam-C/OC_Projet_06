//selectionne la zone principale
const main = document.querySelector("main");

const projetsAPI = await fetch("http://localhost:5678/api/works");
const projets = await projetsAPI.json();
// Transformation des pièces en JSON
const valeurprojets = JSON.stringify(projets);
// Stockage des informations dans le localStorage
window.localStorage.setItem("projets", valeurprojets);



console.log(projets);

function genererPageLogin(){
        
    //creation bloc Login
    const loginSection = document.createElement("section");
    loginSection.id = "login";
    
    const loginArticle = document.createElement("article");
    loginArticle.classList.add("login__container");
    
    const loginHead = document.createElement("h2");
    loginHead.innerText = "Log In";
    
    const loginForm = document.createElement("form");
    loginForm.classList.add("login__fields");
       
    const labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "email-login");
    labelEmail.innerText = "E-mail";
    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "email-login");
    inputEmail.setAttribute("name", "email-login");
    inputEmail.id = "email-login";
    
    const labelMDP = document.createElement("label");
    labelMDP.setAttribute("for", "mdp-login");
    labelMDP.innerText = "Mot de passe";
    const inputMDP = document.createElement("input");
    inputMDP.setAttribute("type", "mdp-login");
    inputMDP.setAttribute("name", "mdp-login");
    inputMDP.id = "mdp-login";

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Se connecter");
    const inputMDPForgot = document.createElement("input");
    inputMDPForgot.setAttribute("type", "mdp-forgot");
    inputMDPForgot.setAttribute("value", "Mot de passe oublié");

    main.appendChild(loginSection);
    loginSection.appendChild(loginArticle);
    loginArticle.appendChild(loginHead);
    loginArticle.appendChild(loginForm);
    loginForm.appendChild(labelEmail)
    loginForm.appendChild(inputEmail)
    loginForm.appendChild(labelMDP)
    loginForm.appendChild(inputMDP)
    loginForm.appendChild(inputSubmit)
    loginForm.appendChild(inputMDPForgot)
};


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

function genererProjets(){
    
    //creation section projets
    const projetsSection = document.createElement("section");
    projetsSection.id = "portfolio";
    
    const projetsHead = document.createElement("h2");
    projetsHead.innerText = "Mes Projets";

    const projetsGallery = document.createElement("div");
    projetsGallery.classList.add("gallery");

    main.appendChild(projetsSection);
    projetsSection.appendChild(projetsHead);
    projetsSection.appendChild(projetsGallery);
    
    
    //creation bloc projet
    function genererTilesProjets(projets) {
        for (let i=0 ; i<projets.length; i++) { 
        const projetTile = document.createElement("figure");
        
        const projetImage = document.createElement("img");
        projetImage.src = projets[i].imageUrl;
        projetImage.setAttribute("alt", projets[i].title);
        const projetCaption = document.createElement("figcaption");
        projetCaption.innerText = projets[i].title;

        
        projetsGallery.appendChild(projetTile);
        projetTile.appendChild(projetImage);
        projetTile.appendChild(projetCaption);
        };
    };
    genererTilesProjets(projets);
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
genererProjets();
genererFormContact();

const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function () {
    main.innerHTML = "";
    genererPageLogin();
})

const navProjets = document.querySelector("#nav-projets");
navProjets.addEventListener("click", function () {
});

console.log()