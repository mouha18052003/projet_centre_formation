const API_URL = "http://localhost:3000/notes";

async function chargerNote() {
    const res = await fetch (  API_URL);
    const data = await res.json();

    const tbody = document.getElementById("tbodyNote");
    tbody.innerHTML = "";

    data.forEach(note =>{
        const tr = document.createElement("tr");
    tr.innerHTML = `
        
        <td>${note.nom_module}</td>
        <td>${note.note_devoir}</td>
        <td>${note.note_examen}</td>
        
       `;
       tbody.appendChild(tr);

    });
}