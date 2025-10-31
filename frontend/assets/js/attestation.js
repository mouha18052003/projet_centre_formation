const API_URL = "http://localhost:3000/attestations";

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


//ajouter une attestation
document.getElementById("attestationForm").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const data = {
        id_apprenant: document.getElementById("id_apprenant").value,
        id_session: document.getElementById("id_session").value,
        date_obtention: document.getElementById("date_obtention").value.split("T")[0],
        resultat: document.getElementById("resultat").value,
    }


    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    await fetch(API_URL, options);
    e.target.reset();
    chargerAttestation();
});


//charger les attestations
async function chargerAttestation() {
    const res = await fetch(API_URL);
    const  data = await res.json();


    const tbody = document.getElementById("tbodyAttestation");
    tbody.innerHTML = "";

    data.forEach(attestation =>{
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${attestation.id_attestation}</td>
        <td>${attestation.prenom_apprenant} ${attestation.nom_apprenant}</td>
        <td>${attestation.nom_session}</td>
        <td>${attestation.date_obtention.split("T")[0]}</td>
        <td>${attestation.resultat}</td>`;

        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    chargerApprenant();
    chargerSession();
    chargerAttestation();
})