import { generateEditionMode } from "./main.js";


//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");


export function generatePageLogin(){
        
    //creation bloc Login
    const loginSection = document.createElement("section");
    loginSection.id = "login";

    const loginHTML = `<article class="login__container">
    <h2>Log In</h2>
        <form class="login__fields">
            <label for="email-login">E-mail</label>
            <input type="email" name="email-login" id="email-login">
            <label for="mdp-login">Mot de passe</label>
            <input type="password" name="mdp-login" id="mdp-login">
            <button type="button" id="btn-login" value="Se connecter">Se connecter</button>
            <input type="mdp-forgot" value="Mot de passe oublié">
        </form>
    </article>`;
    
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

        if (r.ok === true) {
            alert("Connexion réussie");
           localStorage.setItem("tokenID", token.token);
            generateEditionMode();
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    });
};