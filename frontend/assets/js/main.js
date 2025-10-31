//script pour charger la navebare dans toutes mes pageHtml
document.addEventListener("DOMContentLoaded", async () => {
    //recuperation de l'id monNavbare
    const navbar = document.getElementById("monNavbar");
    if (!navbar) 
        return;

    //determination du bon chemin vers la navbare
    const routeNavbar = window.location.pathname.includes("/pages/") ? "../components/navebar.html" : "components/navebar.html";
    try{
        //charger le contenu de la navebar
        const res = await fetch(routeNavbar);
        if(!res.ok) 
            throw new Error("Navbar non trouve");
        const html = await res.text();
        navbar.innerHTML = html;
    }
    catch (err){
        console.error(err);
        navbar.innerHTML = "<P>Impossible de charger la navbar<p>";
        return;
    }

    //corection des liens
    const allLinks = navbar.querySelectorAll("a");
    allLinks.forEach(a =>{
        //lire le href
        const href = a.getAttribute("href");
        if (!href) return;

        //si on est dans page on doit remonter d'un dossier
        if (window.location.pathname.includes("/pages/")){
            a.setAttribute("href", "../" + href);
        }
        else {
            a.setAttribute("href", href);
        }
    });

    });
    
