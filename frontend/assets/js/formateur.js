const API_URL = "http://localhost:3000/formateurs";//adress de mon api backen


//fonction qui permet de charger les formateurs sur le tableau
async function chargerFormateur () {
    const res = await fetch(API_URL);//Recuper les donnes a partir de API_URL
    const data = await res.json(); //on les convertit en objet js pour les manipuler


    const tbdy = document.getElementById("tableFormateur");
    tbdy.innerHTML= "";//apres recuperation de l'id du tableau n l'a vide



    //on parcour le tableau data
    data.forEach(formateur =>{
        const tr = document.createElement("tr"); //creation d'un element tr du tableau
        tr.innerHTML = `
        <td>${formateur.id_formateur}</td>
        <td>${formateur.prenom}</td>
        <td>${formateur.nom}</td>
        <td>${formateur.specialite}</td>
        <td>${formateur.email}</td>
        `;
        tbdy.appendChild(tr);
    });
}


//function qui permet d'ajouter un formateur
document.getElementById("formateurForm").addEventListener("submit", async (e)=>{
    e.preventDefault();//empeche le rechargement de la page

    const data = {
        prenom: document.getElementById("prenom").value,
        nom: document.getElementById("nom").value,
        specialite: document.getElementById("specialite").value,
        email: document.getElementById("email").value,
        mot_de_passe: document.getElementById("mot_de_passe").value,
    };

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},// defint qu'au serveur qu'il s'agit des donnes en format JSON
        body: JSON.stringify(data), //conversion en json pour envoyer les donnes au serveur
    };


    await fetch(API_URL, options);
    e.target.reset();//e.target = l'element qui a declencher l'evenment submit(e) donc le formulaire et reset()methode qui permet de vider les champs de saisi
    chargerFormateur();

});


chargerFormateur();