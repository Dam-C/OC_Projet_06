const BACKEND_URL = "http://localhost:5678/api"

//Selecteur pour la zone dans laquelle le code va se générer
//const main = document.querySelector("main");
   
document.querySelector(".login__fields")
    .addEventListener("submit", async (e)=> {
        e.preventDefault();
        console.log("test")
        const loginIDS = {
        email: document.querySelector("#email-login").value,
        password: document.querySelector("#mdp-login").value,
    };

    const r = await fetch(`${BACKEND_URL}/users/login`, {
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify(loginIDS)
    })

    const token = await r.json();

    if (r.ok === true) {
        alert("Connexion réussie");
        localStorage.setItem("tokenID", token.token);
        window.location.href = "../index.html";
    } else {
        alert(`Erreur dans l’identifiant ou le mot de passe`);
    }
});