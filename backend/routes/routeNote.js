const express = require('express');
const router = express.Router();

const noteController = require('../controllers/controllerNote');
const { verificationToken, autorisationRole, isFormateur } = require('../middlewares/middlewareAuth');
//route pour recuperer les notes des apprenants
router.get('/', verificationToken, autorisationRole('admin', 'formateur'), noteController.getAll);
//route pour recuperer les notes d'un apprenant par son id
router.get('/:id', verificationToken, autorisationRole('admin', 'formateur', 'apprenant'), noteController.getById);
//route pour ajouter les note des apprenants
router.post('/', verificationToken, isFormateur, noteController.create);
//route pour modifier les notes d'un apprenants
router.put('/:id', verificationToken, isFormateur, noteController.update);


module.exports = router;