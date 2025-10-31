
const API_URL = "http://localhost:3000/sessions";//adress de route de mon api


//fonction qui permet de charger les session dans le tableau
async function chargerSession () {
    const res = await fetch(API_URL);
    const data = await res.json();//conversion en objet javascript


    const tbody = document.getElementById("tableSession");
    tbody.innerHTML = "";

    data.forEach(session =>{
        //creation d'un element tr
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${session.nom_session}</td>
        <td>${session.date_debut.split("T")[0]}</td>
        <td>${session.date_fin.split("T")[0]}</td>
        `;
        tbody.appendChild(tr);//l'ajout de l'element tr dans le tbody
    });
}