document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
        alert("Accès refusé.");
        window.location.href = "login.html"; // ou la page de connexion
    }
});
