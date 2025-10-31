// importation du fichier qui sert a connecter les donnes de la base de donne de .env
require('dotenv').config();

const mysql = require('mysql2/promise');//importation du module mysql2

//connection a ma base de donne
const db = mysql.createPool({ 
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = db;//importation de la base de donne en tant que module pour pouvoir l'utiliser dans autre dossier/fichier
