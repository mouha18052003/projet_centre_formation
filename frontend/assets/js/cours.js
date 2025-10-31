const API_URL = "http://localhost:3000/cours";

//charger les sessions
async function chargerSession () {
    const res = await fetch("http://localhost:3000/sessions");
    const data = await res.json();

    const select = document.getElementById("id_session");
    select.innerHTML = data 
    .map( session => `<option value="${session.id_session}">${session.nom_session}</option>`).join("");
}

//charger les modules
async function chargerModule () {
    const res = await fetch("http://localhost:3000/modules");
    const data = await res.json();

    const select = document.getElementById("id_module");
    select.innerHTML = data
    .map( module => `<option value="${ module.id_module}">${module.nom_module}</option>`).join("");
}

//charger les formateurs
async function chargerFormateur () {
    const res = await fetch("http://localhost:3000/formateurs");
    const data = await res.json();

    const select = document.getElementById("id_formateur")
    select.innerHTML = data
    .map ( formateur => `<option value="${formateur.id_formateur}">${formateur.prenom} ${formateur.nom}</option>`).join("");

}

//charger les salles
async function chargerSalle () {
    const res = await fetch("http://localhost:3000/salles");
    const data = await res.json();

    const select = document.getElementById("id_salle")
    select.innerHTML = data
    .map ( salle => `<option value="${salle.id_salle}">${salle.nom_salle}</option>`).join("");

}


//  ajouter/modifier un cours
document.getElementById("coursForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const id_cours = document.getElementById("id_cours").value;//a cause de la modificatio il faut l'importer
    const data = {
        id_session: document.getElementById("id_session").value,
        id_module: document.getElementById("id_module").value,
        id_formateur: document.getElementById("id_formateur").value,
        id_salle: document.getElementById("id_salle").value,
        heure_debut: document.getElementById("heure_debut").value,
        heure_fin: document.getElementById("heure_fin").value,
        date_cours: document.getElementById("date_cours").value.split("T")[0],
       
    };
    
    const options = {
        method: id_cours ? "PUT" : "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
    }

    const URL = id_cours ? `${API_URL}/${id_cours}` : API_URL;
    await fetch(URL, options);
    e.target.reset();
    chargerCours();
});


//modifier un cours
async function modifierCours (id) {
    const res = await fetch(`${API_URL}/${id}`);
    const cours = await res.json();

    document.getElementById("id_cours").value = cours.id_cours;
    document.getElementById("id_session").value = cours.id_session;
    document.getElementById("id_module").value = cours.id_module;
    document.getElementById("id_formateur").value = cours.id_formateur;
    document.getElementById("id_salle").value = cours.id_salle;
    document.getElementById("heure_debut").value = cours.heure_debut;
    document.getElementById("heure_fin").value = cours.heure_fin;
    document.getElementById("date_cours").value = cours.date_cours.split("T")[0];
    

}


//suprimer un cours
async function suprimerCours (id) {
    if(confirm("Veux tu supprimer ce cours")) {
        await fetch (`${API_URL}/${id}`, {method: "DELETE"});
        chargerCours();
    }
}


//charger les cours
async function chargerCours() {
    const res = await fetch (  API_URL);
    const data = await res.json();

    const tbody = document.getElementById("tbodyCours");
    tbody.innerHTML = "";

    data.forEach(cours =>{
        const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${cours.id_cours}</td>
        <td>${cours.nom_session}</td>
        <td>${cours.nom_module}</td>
        <td>${cours.prenom_formateur} ${cours.nom_formateur}</td>
        <td>${cours.nom_salle}</td>
        <td>${cours.heure_debut}</td>
        <td>${cours.heure_fin}</td>
        <td>${cours.date_cours.split("T")[0]}</td>
        <td>
        <button class="btn btn-warning btn-sm" onclick="modifierCours(${cours.id_cours})">✏️</button>
    
        <button class="btn btn-danger btn-sm" onclick="suprimerCours(${cours.id_cours})">🗑️</button>
        </td>
       `;
       tbody.appendChild(tr);

    })
    
}


//Tu dois appeler tes fonctions une fois le DOM chargé 
// sinon document.getElementById("id_session") et id_apprenant ne seront pas encore créés.

document.addEventListener("DOMContentLoaded", () => {
  chargerSession();
  chargerModule();
  chargerFormateur();
  chargerSalle();
  chargerCours();
});


