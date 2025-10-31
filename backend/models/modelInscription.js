const db = require('../config/connexion');

 const inscriptionModel = {

// Récupérer toutes les inscriptions (depuis la vue SQL)
getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM vue_inscriptions ORDER BY id_inscription ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM vue_inscriptions WHERE id_inscription =?', [id]);
    return rows[0];
},

create: async (apprenant_inscrit)=>{
    const { id_apprenant, id_session} = apprenant_inscrit;
    const [newInscrit] = await db.query(
      `INSERT INTO inscriptions (id_apprenant, id_session)
      VALUES (?, ?)`,
      [id_apprenant, id_session]
);
   return { id_inscription: newInscrit.insertId, ...apprenant_inscrit} ;
},

delete: async (id)=>{
    const [apprenant_desinscrit] = await db.query('DELETE FROM inscriptions WHERE id_inscription =?', [id]);
    return apprenant_desinscrit.affectedRows > 0;
},


};


module.exports = inscriptionModel;