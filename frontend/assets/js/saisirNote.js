const API_URL = "http://localhost:3000/notes";

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



//charger les modules
async function chargerModule () {
    const res = await fetch("http://localhost:3000/modules");
    const data = await res.json();

    const select = document.getElementById("id_module");
    select.innerHTML = data
    .map( module => `<option value="${ module.id_module}">${module.nom_module}</option>`).join("");
}


//charger les notes
async function chargerNote() {
    const res = await fetch (  API_URL);
    const data = await res.json();

    const tbody = document.getElementById("tbodyNote");
    tbody.innerHTML = "";

    data.forEach(note =>{
        const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${note.prenom_apprenant} ${note.nom_apprenant}</td>
        <td>${note.nom_module}</td>
        <td>${note.note_devoir}</td>
        <td>${note.note_examen}</td>
       `;
       tbody.appendChild(tr);

    });
    
}

document.addEventListener("DOMContentLoaded", () => {
  chargerApprenant();
  chargerModule();
  chargerNote();
});

