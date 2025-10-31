const db = require("../config/connexion");

const bcrypt = require('bcrypt');

const authModel = {

    //inscription de l'apprenant
    inscrirApprenant: async (Apprenant, id_session) => {
        try {
            const { prenom, nom, date_naissance, telephone, adress_email, mot_de_passe } = Apprenant;
            //Hacher le mot de pass
            const hash = await bcrypt.hash(mot_de_passe, 10);

            //insertion das la table apprenant
            const [resultat] = await db.query(
                `INSERT INTO apprenants (prenom, nom, date_naissance, telephone, adress_email, statut, mot_de_passe)
        VALUES(?, ?, ?, ?, ?, 'en_formation', ?)`,
                [prenom, nom, date_naissance, telephone, adress_email, hash]
            );

            const id_apprenant = resultat.insertId;

            //appel de la procedure d'inscription automatique
            await db.query('CALL inscrire_apprenant(?, ?)', [id_apprenant, id_session]);

            //retournons les infos util
            return { id_apprenant, prenom, nom, adress_email };
        }
        catch (error) {
            console.error("Erreur dans inscrirApprenant:", error);
            throw error;
        }
    },


//connection pour tous role
findUserByEmail: async (email) => {
    try{
        //chercher dans la table des apprenants
        const [apprenant] = await db.query(
            `SELECT id_apprenant AS id, prenom, nom, adress_email AS email, mot_de_passe, 'apprenant' AS role
            FROM apprenants WHERE adress_email = ?`,
            [email]
        );
        if (apprenant.length > 0) return apprenant[0];

        //chercher dans la table formateur 
        const [formateur] = await db.query(
            `SELECT id_formateur AS id, prenom, nom, email, mot_de_passe, 'formateur' AS role
            FROM formateurs WHERE email = ?`,
            [email] 
        );
        if (formateur.length > 0) return formateur[0];

        //chercher dans la table admin
        const [admin] = await db.query(
            `SELECT id_admin AS id, prenom, nom, email, mot_de_passe, 'admin' AS role
            FROM admins WHERE email = ?`,
            [email]
        );
        if (admin.length > 0) return admin[0];

        //si aucun est trouve
        return null;
        }
        catch(error) {
            console.error("Erreur dans findUserByEmail : ", error);
            throw error;
        }
},

};

module.exports = authModel;