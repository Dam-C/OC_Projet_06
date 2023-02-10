//Selecteur pour la zone dans laquelle le code va se générer
const main = document.querySelector("main");

//creation Partie introduction
export function generateIntroProjects(){ 

    //creation bloc intro
    const projectsIntroSection = document.createElement("section");
    projectsIntroSection.id = "introduction";

    const projectsIntroFigure = document.createElement("figure");
    projectsIntroFigure.id = "intro-figure";

    const projectsIntroFigureImg = document.createElement("img");
    projectsIntroFigureImg.src = "./assets/images/sophie-bluel.png";

    const projectsIntroArticle = document.createElement("article");
    projectsIntroArticle.id = "intro-article";
    const projectsIntroText = `
    <h2>Designer d'espace</h2>
    <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
    <p>Chaque project sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
    <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
    `;
    projectsIntroArticle.innerHTML = projectsIntroText;

    main.appendChild(projectsIntroSection);
    projectsIntroSection.appendChild(projectsIntroFigure);
    projectsIntroFigure.appendChild(projectsIntroFigureImg);
    projectsIntroSection.appendChild(projectsIntroArticle);
};
