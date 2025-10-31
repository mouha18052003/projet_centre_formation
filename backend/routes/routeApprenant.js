const express = require('express');
const router = express.Router(); // initialisation de express.Router() pour gerer les routes
//importation du module des controller
const ControllerApprenant = require('../controllers/controllerApprenant');
const { verificationToken, isAdmin } = require('../middlewares/middlewareAuth');//importation des middlwre d'authentification

//route pour recuperer les apprenants en applant la fonction verificationToken et auorisation[role]
router.get('/', verificationToken, isAdmin, ControllerApprenant.getAll);
//route pour recuperer un apprenant par son id
router.get('/:id', verificationToken, isAdmin, ControllerApprenant.getById);
//route pour inserer un apprenant
router.post('/', verificationToken, isAdmin, ControllerApprenant.create);
//route pour mettre a jour un apprenant
router.put('/:id', verificationToken, isAdmin, ControllerApprenant.update);
//route pour supprimer un apprenant
router.delete('/:id', verificationToken, isAdmin, ControllerApprenant.delete);


module.exports = router;