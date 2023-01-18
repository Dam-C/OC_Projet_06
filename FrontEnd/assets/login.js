import { generateIntroprojects, generateprojectsHead, generateprojects, generateFormContact} from "./main.js";


const main = document.querySelector("main");


export function generatePageLogin(){
        
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
 //       const LST = JSON.stringify(token);
  //      console.log(LST);
         if (r.ok === true) {
            alert("Connexion réussie");
            localStorage.setItem("tokenID", token.token);
            generateEditionMode();
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }

        let LSTTest = window.localStorage.getItem("tokenID");
       console.log(LSTTest);

    });
      
};

export function generateEditionMode () {

    // EM = Edition Mode
    const body = document.querySelector("body");
    const introFigureEM = document.querySelector("#intro-figure");
    const introArticleEM = document.querySelector("#introduction article");
    const projectsEM = document.querySelector("#intro-article");

    const mainEM = document.createElement("p");
//    mainEM.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`

    const headerEM = document.createElement("div");
    headerEM.id = "top-edit-mode-container";
    headerEM.innerHTML = `<div id="top-edit-mode"><i class="fa-regular fa-pen-to-square"></i> Mode édition<button>publier les changements</button></div>`;

    body.prepend(headerEM);
//    introFigureEM.appendChild(mainEM);

// <i class="fa-regular fa-pen-to-square"></i>
}