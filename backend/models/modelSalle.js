const db = require('../config/connexion');



const salleModel = {


getAll: async ()=> {
    const [rows] = await db.query("SELECT * FROM salles ORDER BY id_salle ASC");
    return rows;
},


getById: async (id) =>{
    const [rows] = await db.query('SELECT * FROM salles WHERE id_salle = ?', [id]);
    return rows[0];
}

};


module.exports = salleModel;