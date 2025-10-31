const express = require('express');
const router = express.Router();

const coursController = require('../controllers/controllerCours');
const { verificationToken, isAdmin, autorisationRole } = require('../middlewares/middlewareAuth');


//route pour recuperer les cours
router.get('/', verificationToken, autorisationRole('admin', 'formateur', 'apprenant' ), coursController.getAll);
//route pour recuperer un cours par son id
router.get('/:id', verificationToken, autorisationRole('admin', 'formateur', 'apprenant' ), coursController.getById);
//route pour ajouter un cours
router.post('/', verificationToken, isAdmin, coursController.create);
//route pour modifier un cours
router.put('/:id', verificationToken, isAdmin, coursController.update);
//route pour supprimer un cours
router.delete('/:id', verificationToken, isAdmin, coursController.delete);



module.exports = router;


