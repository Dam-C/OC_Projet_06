import { callModal } from "./modal.js";

//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

export function generateEditionMode () {

    const body = document.querySelector("body");
    const headerEM = document.createElement("div");
    headerEM.id = "top-edit-mode-container";
    headerEM.innerHTML = `
    <div id="top-edit-mode">
    <i class="fa-regular fa-pen-to-square"></i>Mode édition
    <button>publier les changements</button>
    </div>`;

    body.prepend(headerEM);

    // EM = Edition Mode - Génère les boutons d'édition du site
    const loginLogout = document.querySelector("#nav-login");
    loginLogout.id = "nav-logout";
    loginLogout.innerText = "logout";
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

    // Génération de la modal permettant d'ajouter ou retirer des projets
    document.querySelector("#modif-portfolio").addEventListener("click", callModal);

    const Logout = document.querySelector("#nav-logout");
    Logout.addEventListener("click", () => {
        Logout.innerText = "Login";
        Logout.innerHTML = `<a href="pages/login.html">login</a>`;
        Logout.id = "nav-login";
        document.querySelector("#modif-figure").remove();
        document.querySelector("#modif-intro").remove();
        document.querySelector("#modif-portfolio").remove();
        document.querySelector("#top-edit-mode-container").remove();
        localStorage.clear();
    })
};