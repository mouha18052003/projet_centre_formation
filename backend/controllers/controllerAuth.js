const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authController = {


//inscription Apprenant
inscrirApprenant: async (req, res) => {
    try {
        //on recuper les variable en objet(destruction)
        const { prenom, nom, date_naissance, telephone, adress_email, mot_de_passe, id_session } = req.body;

        if(!prenom || !nom || !adress_email || !mot_de_passe || !id_session){
            return res.status(400).json({ message: "Tous les champs sont obligatoires"})
        }
        
        //ici on cree un objet 
        const Apprenant = { prenom, nom, date_naissance, telephone, adress_email, mot_de_passe};
        const newApprenant = await authModel.inscrirApprenant(Apprenant,id_session);

        res.status(201).json({
            message: 'Inscription reussi !',
            apprenant: newApprenant
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'inscription"});
    }
},

// connection pour tous les roles

login: async (req,res) => {
    const { email, mot_de_passe} = req.body;

    try {
        const user = await authModel.findUserByEmail(email);
        if(!user) {
            return res.status(404).json( { message: "Utilisateur introuvable"});
        }
        const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isValid) {
            return res.status(401).json({ message: "Mot de pass incorect"});
        }

        //generation du token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,//ceci ce trouve dans le fichier .env et c'est la cle secret
            { expiresIn: "2h" }
        );

        res.status(200).json({
            message: `Connexion reussi (${user.role})`,
            token,
            role: user.role,
            id: user.id
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json( { message: "Erreur lors de la connection"});

    }
}

};

module.exports = authController;