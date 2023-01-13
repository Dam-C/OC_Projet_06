const main = document.querySelector("main");

export function genererPageLogin(){
        
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
