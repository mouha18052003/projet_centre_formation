//on defini l'adress de base de l'API
const API_URL = "http://localhost:3000/apprenants";

//fonction pour charger les apprenants

//ceci est une type de fonction qui peut etre appeller avant sa declaration
async function chargerApprenant(){
    const res = await fetch(API_URL);
    const data = await res.json();

    const tbody = document.getElementById("tableApprenant");
    tbody.innerHTML = "";//vider le tableau 


    data.forEach(apprenant => {
        const tr = document.createElement("tr");//permet de creer un element tr de mon tbdy
        tr.innerHTML = `
        <td>${apprenant.id_apprenant}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.nom}</td>
        <td>${apprenant.date_naissance.split("T")[0]}</td>
        <td>${apprenant.telephone}</td>
        <td>${apprenant.adress_email}</td>
        <td>${apprenant.statut}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="modifierApprenant(${apprenant.id_apprenant})">✏️</button>
            <button class="btn btn-warning btn-sm" onclick="supprimerApprenant(${apprenant.id_apprenant})">🗑️</button>
        </td>
        `;
        tbody.appendChild(tr);

    });
}


//ajouter ou modifier un apprenant
document.getElementById("apprenantForm").addEventListener("submit", async (e)=> {
    e.preventDefault();//empeche la page de se recharger
    const id = document.getElementById("id_apprenant").value;
    const data = {
        prenom: document.getElementById("prenom").value,
        nom: document.getElementById("nom").value,
        date_naissance: document.getElementById("date_naissance").value.split("T")[0],  
        telephone: document.getElementById("telephone").value,
        adress_email: document.getElementById("adress_email").value,
        statut: document.getElementById("statut").value || "en_formation",
        mot_de_passe: document.getElementById("mot_de_passe").value,
    };

    const option = {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),//convertir les donnes data en json pour les envoyer au serveur
    };

    const url = id ? `${API_URL}/${id}` : API_URL;
    await fetch(url, option);
    e.target.reset();
    chargerApprenant();
});


//suprimer un apprenant
async function supprimerApprenant(id) {
    if(confirm("veux tu supprimer?")) {
        await fetch(`${API_URL}/${id}`, { method:"DELETE"});
        chargerApprenant();
    }
}



//modifier  un apprenant
async function modifierApprenant(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const apprenant = await res.json();//convertir les donnes en objet javascript

    document.getElementById("id_apprenant").value = apprenant.id_apprenant;
    document.getElementById("prenom").value = apprenant.prenom;
    document.getElementById("nom").value = apprenant.nom;
    document.getElementById("date_naissance").value = apprenant.date_naissance.split("T")[0];
    document.getElementById("telephone").value = apprenant.telephone;
    document.getElementById("adress_email").value = apprenant.adress_email;
    document.getElementById("statut").value = apprenant.statut || "en_formation";
    document.getElementById("mot_de_passe").value = apprenant.mot_de_passe;
    
}


//charger au demararge
chargerApprenant();