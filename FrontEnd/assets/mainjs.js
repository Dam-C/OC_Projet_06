//selectionne la zone principale
const main = document.querySelector("main");



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



function genererPageProjets(projets){

    
    //creation bloc intro
    
    const projetIntroFigure = document.createElement("figure");
    
    const projetIntroArticle = document.createElement("article");
    
    const projetIntroText = "<h2>Designer d'espace</h2><p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p><p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p><p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>";

    
    //creation bloc projets
    const projetTile = document.createElement("figure");
    
    const projetImages = document.createElement("img");

    const projetCaption = document.createElement("figcaption");
    
    //creation bloc formulaire
};

const navLogin = document.querySelector("#nav-login");
navLogin.addEventListener("click", function () {
    main.innerHTML = "";
    genererPageLogin();
})

const navProjets = document.querySelector("#nav-projets");
navProjets.addEventListener("click", function () {
});

console.log()