const db = require('../config/connexion');


const formateurModel = {

getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM formateurs ORDER BY id_formateur ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM formateurs WHERE id_formateur =?', [id]);
    return rows[0];
},

create: async (formateur)=>{
    const { prenom, nom, specialite, email, mot_de_passe} = formateur;
    const [resultat] = await db.query(
        `INSERT INTO formateurs (prenom, nom, specialite, email, mot_de_passe)
        VALUES (?, ?, ?, ?, ?)`,
    [prenom, nom, specialite, email, mot_de_passe]
);
return { id_formateur: resultat.insertId, ...formateur};
},

};

module.exports = formateurModel;