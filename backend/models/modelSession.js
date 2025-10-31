const db = require('../config/connexion');

const sessionModel = {


getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM sessions ORDER BY id_session ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM sessions WHERE id_session = ?', [id]);
    return rows[0];
},

// model pour creer une session
create: async (session)=>{
    const { nom_session, date_debut, date_fin} = session;
    const [resultat] = await db.query(
        `INSERT INTO sessions (nom_session, date_debut, date_fin)
        VALUES(?, ?, ?)`,
    [nom_session, date_debut, date_fin]
);
    return { id_session: resultat.insertId, ...session};
},

    
};

module.exports = sessionModel;