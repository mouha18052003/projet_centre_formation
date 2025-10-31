const API_URL = "http://localhost:3000/authentifier/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const mot_de_passe = document.getElementById("mot_de_passe").value;


    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, mot_de_passe }),   
        });

        const data = await res.json();
    

        if (!res.ok) throw Error(data.message || "Erreur de connexion");

        // Vérifier si admin AVANT de sauvegarder
        if (data.role !== "admin") {
            console.log(" Accès refusé - Role:", data.role);
            alert("Accès refusé.");
            return;
        }

        // Sauvegarde du token et role pour les admins
        console.log(" Admin détecté - Sauvegarde des données");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        
        // Redirection immédiate vers index.html
        window.location.href = "index.html";

    } catch (err) {
        console.error(" Erreur:", err);
        alert(err.message);
    }
});