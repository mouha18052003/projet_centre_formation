
const db = require('../config/connexion');

const attestationModel = {

getAll: async ()=>{
    const [rows] = await db.query('SELECT * FROM vue_attestations ORDER BY id_attestation ASC');
    return rows;
},

getById: async (id)=>{
    const [rows] = await db.query('SELECT * FROM vue_attestations WHERE id_attestation =?', [id]);
    return rows[0];
},

//ici j'ai appele la procedure attester_apprenant pour la table attestation
create: async(attestation)=>{
    const { id_apprenant, id_session} = attestation;
    try {
        await db.query("CALL attester_apprenant(?,?)", [id_apprenant, id_session]);
        return { message: "Attestation genere avec succe"};
    }
    catch(error){
        console.error("Erreur lors de la generation de l'attestation:", error);
        throw error;
    }
},


};


module.exports = attestationModel;