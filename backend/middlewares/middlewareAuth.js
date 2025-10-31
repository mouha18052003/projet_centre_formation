const jwt = require('jsonwebtoken');

//verification si le token est valide
const verificationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];//recuperaton de la valeur de l'entete de l'autorisation
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) {
        return res.status(403).json({ message: "Token manquante !"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;//on crée une nouvelle propriété appelée user sur l'objet req et on lui assigne la valeur de decoded
        next();
    }
    catch(error) {
        res.status(401).json({ message: "Token invalide ou expire"});
    }

};

//verifier si le role du user correspond
 const autorisationRole = (...roles) => {
    return (req, res, next) => {
        //ici on verifie si le role de l'utilisateur est autorise pour chaque route ici
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acces interdit !"});
        }
        next();
    };

 };


 //j'essaie de rendre ma fonction autorisationRole en raccourci pratique
 const isAdmin = autorisationRole('admin');
 const isFormateur = autorisationRole('formateur');
 const isApprenant = autorisationRole('apprenant');

 module.exports = { verificationToken, autorisationRole, isAdmin, isFormateur, isApprenant};
