const API_URL = "http://localhost:3000/modules";//adress de route de mon api


//fonction qui permet de charger les session dans le tableau
async function chargerModule () {
    const res = await fetch(API_URL);
    const data = await res.json();//conversion en objet javascript


    const tbody = document.getElementById("tableModule");
    tbody.innerHTML = "";

    data.forEach(module =>{
        //creation d'un element tr
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${module.id_module}</td>
        <td>${module.nom_module}</td>
        <td>${module.duree}</td>
        `;
        tbody.appendChild(tr);//l'ajout de l'element tr dans le tbody
    });
}


//ajouter une session
document.getElementById("moduleForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = {
        nom_module: document.getElementById("nom_module").value,
        duree: document.getElementById("duree").value,
    }

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),//conversion des donnes en json pour les envoyers au serveur
    };

    await fetch(API_URL, options);
    e.target.reset();
    chargerModule();

});


chargerModule();

