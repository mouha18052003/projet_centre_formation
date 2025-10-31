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



//  ajouter/modifier une note
document.getElementById("noteForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const id_note = document.getElementById("id_note").value;
    const data = {
        id_apprenant: document.getElementById("id_apprenant").value,
        id_module: document.getElementById("id_module").value,
        note_devoir: document.getElementById("note_devoir").value,
        note_examen: document.getElementById("note_examen").value,
    };
    
    const options = {
        method: id_note ? "PUT" : "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
    }

    const URL = id_note ? `${API_URL}/${id_note}` : API_URL;
    await fetch(URL, options);
    e.target.reset();
    chargerNote();
});


//modifier un cours
async function modifierNote (id_note) {
    const res = await fetch(`${API_URL}/${id_note}`);
    const note = await res.json();

    document.getElementById("id_note").value = note.id_note;
    document.getElementById("id_apprenant").value = note.id_apprenant;
    document.getElementById("id_module").value = note.id_module;
    document.getElementById("note_devoir").value = note.note_devoir;
    document.getElementById("note_examen").value = note.note_examen;

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
        <td>${note.id_note}</td>
        <td>${note.prenom_apprenant} ${note.nom_apprenant}</td>
        <td>${note.nom_module}</td>
        <td>${note.note_devoir}</td>
        <td>${note.note_examen}</td>
        <td>${note.moyenne}</td>

        
        <td>
        <button class="btn btn-warning btn-sm" onclick="modifierNote(${note.id_note})">✏️</button>
        </td>
       `;
       tbody.appendChild(tr);

    });
    
}


//Tu dois appeler tes fonctions une fois le DOM chargé 
// sinon document.getElementById("id_session") et id_apprenant ne seront pas encore créés.

document.addEventListener("DOMContentLoaded", () => {
  chargerApprenant();
  chargerModule();
  chargerNote();
});

