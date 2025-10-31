const db = require('../config/connexion');

const noteModel = {

getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM vue_notes ORDER BY id_note ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM vue_notes WHERE id_note =?', [id]);
    return rows[0];
},

create: async (note)=>{
    const { id_apprenant, id_module, note_devoir, note_examen} = note;
    const newNote = await db.query(
        `INSERT INTO notes (id_apprenant, id_module, note_devoir, note_examen)
        VALUES (?, ?, ?, ?)`,
    [id_apprenant, id_module, note_devoir, note_examen]
);
return { id_note: newNote.insertId, ...note};
},

update: async (id, note)=>{
    const { id_apprenant, id_module, note_devoir, note_examen} = note;
    await db.query(
        `UPDATE notes
        SET id_apprenant =?, id_module =?, note_devoir =?, note_examen =?, moyenne =? WHERE id_note =?`,
    [id_apprenant, id_module, note_devoir, note_examen, moyenne, id]
);
return { id_apprenant: id, ...note};
},


};

module.exports = noteModel;