const db = require('../config/connexion')//importation de la module du dossier config

//on regroupe tous les models dans un objet pour faciliter l'exportation
const ApprenantModel = {

//recuperer les apprenants
getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM apprenants ORDER BY id_apprenant ASC');
    return rows;
},

//recuperer un apprenant par son id
getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM apprenants WHERE id_apprenant =?', [id]);
    return rows[0];
},

//creer un nouveau apprenant
create: async (Apprenant)=>{
    const { prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe} = Apprenant ;
    const [resultat] = await db.query(
        `INSERT INTO apprenants (prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe],
    );
    return { id_apprenant: resultat.insertId, ...Apprenant } ;      
},

//mise a jour un nouveau apprenant
update: async (id, apprenant)=>{
    const {prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe} = apprenant;
    await db.query(
    `UPDATE apprenants
    SET prenom =?, nom =?, date_naissance =?, telephone =?, adress_email =?, statut =?, mot_de_passe =? WHERE id_apprenant =?`,
    [prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe, id],
);
return { id_apprenant: id, ...apprenant}
},

//suprimer un apprenant
delete: async (id)=>{
    const [resultat] = await db.query(`DELETE FROM apprenants WHERE id_apprenant =?`, [id]);
    return resultat.affectedRows > 0;
},

};

module.exports = ApprenantModel; // exportation de la module