const db = require('../config/connexion');

const moduleModel = {

getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM modules ORDER BY id_module ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM modules WHERE id_module =?', [id]);
    return rows[0];
},

create: async (Module)=>{
    const { nom_module, duree } = Module;
    const [newModule] = await db.query(
        `INSERT INTO modules (nom_module, duree)
        VALUES (?, ?)`,
    [nom_module, duree]
);
return { id_module: newModule.insertId, ...Module};
},


};

module.exports = moduleModel;