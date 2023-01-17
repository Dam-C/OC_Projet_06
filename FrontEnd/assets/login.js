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
            password: loginPass
        };

        const loginReqIDS = JSON.stringify(loginIDS);

        console.log(loginReqIDS); //ok jusque là

        const r = fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: loginReqIDS

        })

        console.log(r);
        
        if (r.ok === true) {
            return r.json();
        }
        throw new Error("Ca marche pas frère !")

    });
      
};
    
    /*
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
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email-login");
    inputEmail.id = "email-login";
    
    const labelMDP = document.createElement("label");
    labelMDP.setAttribute("for", "mdp-login");
    labelMDP.innerText = "Mot de passe";
    const inputMDP = document.createElement("input");
    inputMDP.setAttribute("type", "password");
    inputMDP.setAttribute("name", "mdp-login");
    inputMDP.id = "mdp-login";

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Se connecter");
    const inputMDPForgot = document.createElement("input");
    inputMDPForgot.setAttribute("type", "mdp-forgot");
    inputMDPForgot.setAttribute("value", "Mot de passe oublié");

    
    loginSection.appendChild(loginArticle);
    loginArticle.appendChild(loginHead);
    loginArticle.appendChild(loginForm);
    loginForm.appendChild(labelEmail)
    loginForm.appendChild(inputEmail)
    loginForm.appendChild(labelMDP)
    loginForm.appendChild(inputMDP)
    loginForm.appendChild(inputSubmit)
    */




/*
export function clickLogin (e){
    e.preventDefault();
    fetch ("http://localhost:5678/api/users/login", {
       method: "POST",
       body: JSON.stringify({
         email: this.state.idValue,
         headers: { "Content-Type": "application/json" },
         password: this.state.pwValue
      }),
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.message === "SUCCESS"){
        alert("You are logged in.");
        //this.goToMain();
       } else {
           alert("Erreur dans l’identifiant ou le mot de passe");
       }
       

    });
    console.log("test");
  }
*/
