const API_URL = "http://localhost:3000/cours";

async function chargerCours() {

     const res = await fetch (  API_URL);
     const data = await res.json();

    const tbody = document.getElementById("tbodyCours");
    tbody.innerHTML = "";

    data.forEach(cours =>{
        const tr = document.createElement("tr");
    tr.innerHTML = `

        <td>${cours.nom_session}</td>
        <td>${cours.nom_module}</td>
        <td>${cours.prenom_formateur} ${cours.nom_formateur}</td>
        <td>${cours.nom_salle}</td>
        <td>${cours.heure_debut}</td>
        <td>${cours.heure_fin}</td>
        <td>${cours.date_cours.split("T")[0]}</td>
       `;
       tbody.appendChild(tr);

    })
    
}

document.addEventListener("DOMContentLoaded", chargerCours);