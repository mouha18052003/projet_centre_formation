const db = require('../config/connexion');

const coursModel = {

getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM vue_cours ORDER BY id_cours ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM vue_cours WHERE id_cours =?', [id]);
    return rows[0];
},



// ici on utilise la procedure planification por inserer les donnes ave c verification dans la table cours
create: async (cours)=>{
    const { id_session, id_module, id_formateur, id_salle, heure_debut, heure_fin, date_cours } = cours;
    try {
        await db.query("CALL planification(?, ?, ?, ?, ?, ?, ?)",
            [id_session, id_module, id_formateur, id_salle, heure_debut, heure_fin, date_cours]
        );

        return { message: "Coursplanifie avec succe"};
    }
    catch(error){
        //"ER_SIGNAL_EXCEPTION" : Code spécifique qui indique que l'erreur vient d'un SIGNAL dans une procédure stockée 
        //(erreur métier personnalisée, pas une erreur technique).
        if(error.code === "ER_SIGNAL_EXCEPTION") {
            //error.sqlMessage : Contient le message personnalisé défini dans la procédure stockée (le texte après MESSAGE_TEXT)
            throw new Error(error.sqlMessage);
        }
        throw error;
    }
    
},

update: async (id, cours)=>{
    const { id_session, id_module, id_formateur, id_salle, heure_debut, heure_fin, date_cours } = cours;
    await db.query(
        `UPDATE cours
        SET id_session =?, id_module =?, id_formateur =?, id_salle =?, heure_debut =?, heure_fin =?, date_cours =? WHERE id_cours =?`,
        [id_session, id_module, id_formateur, id_salle, heure_debut, heure_fin, date_cours, id]
    );
    return {id_cours: id, ...cours};
},

delete: async (id)=>{
    const [cours] = await db.query('DELETE FROM cours WHERE id_cours =?', [id]);
    return cours.affectedRows > 0;
},


};


module.exports = coursModel;