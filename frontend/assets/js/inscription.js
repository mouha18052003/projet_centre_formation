
const API_URL = "http://localhost:3000/inscriptions";


//charger les apprenant pour l'input deroulant
async function chargerApprenant () {
    const res = await fetch("http://localhost:3000/apprenants");
    const data = await res.json();

    const select = document.getElementById("id_apprenant");//recuperationdu select deroulant des apprenant
    //on remplit l'element html select
    select.innerHTML = data
    .map(apprenant => `<option value="${apprenant.id_apprenant}">${apprenant.prenom} ${apprenant.nom}</option>`).join("");
    //map() permet de transformer chaque element du tableau en quelque chose de nouveau et join("")permet de concataner en une bande 
}


//charger les sessions pour le menu deroulant
async function chargerSession () {
    const res = await fetch("http://localhost:3000/sessions");
    const data = await res.json();

    const select = document.getElementById("id_session");
    select.innerHTML = data 
    .map(session => `<option value= "${session.id_session}">${session.nom_session}</option>`).join("");
}

//ajouter une inscription
//ici on a pas besoin de remplir date_inscription car le backend s'en chargera
document.getElementById("inscriptionForm").addEventListener("submit", async (e) =>{
    e.preventDefault();
    const id_apprenant = document.getElementById("id_apprenant").value;
    const id_session = document.getElementById("id_session").value;

    const options = {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({ id_apprenant, id_session}),
    }

    await fetch(API_URL, options);
    alert("Apprenant inscrit avec succes!")
    e.target.reset();//methode qui reinitialise tous les champs
    chargerInscription();
});


//fonction qui permet de charger tous les inscriptions
async function chargerInscription () {
    const res = await fetch(API_URL);//ici on recupere les donnes de la table vue_inscription
    const data = await res.json();

    const tbody = document.getElementById("tbodyInscription");
    tbody.innerHTML = "";

    data.forEach(inscription => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${inscription.id_inscription}</td>
        <td>${inscription.prenom_apprenant} ${inscription.nom_apprenant}</td>
        <td>${inscription.nom_session}</td>
        <td>${inscription.date_inscription.split("T")[0]}</td>
        <td>
        <button class="btn btn-warning btn-sm" onclick="suprimerInscription(${inscription.id_inscription})">🗑️</button>
        </td>
       `;
       tbody.appendChild(tr);
    });
}

async function suprimerInscription (id) {
    if(confirm("Veux tu suprimer cette inscription")){
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});
        chargerInscription();
    }
   
}


//Tu dois appeler tes fonctions une fois le DOM chargé 
// sinon document.getElementById("id_session") et id_apprenant ne seront pas encore créés.

document.addEventListener("DOMContentLoaded", () => {
  chargerApprenant();
  chargerSession();
  chargerInscription();
});





