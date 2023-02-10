const BACKEND_URL = "http://localhost:5678/api"

// Ecoute les évènements du formulaire, une fois soumis, ses données sont envoyées à l'API et si valides, un message indique que la connexion a réussi.
document.querySelector(".login__fields")
    .addEventListener("submit", async (e)=> {
        e.preventDefault();
        const loginIDS = {
        email: document.querySelector("#email-login").value,
        password: document.querySelector("#mdp-login").value,
    };

    const response = await fetch(`${BACKEND_URL}/users/login`, {
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json"
        },
        body: JSON.stringify(loginIDS)
    })

    const token = await response.json();

    if (r.ok === true) {
        alert("Connexion réussie");
        localStorage.setItem("tokenID", token.token);
        window.location.href = "../index.html";
    } else {
        alert(`Erreur dans l’identifiant ou le mot de passe`);
    }
});