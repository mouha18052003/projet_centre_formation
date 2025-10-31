const express = require('express');
const router = express.Router();

const inscriptionController = require('../controllers/controllerInscription');
const { verificationToken, autorisationRole, isAdmin, } = require('../middlewares/middlewareAuth');

//les routes
router.get('/', verificationToken, isAdmin, inscriptionController.getAll);
router.get('/:id', verificationToken, autorisationRole('admin', 'apprenant'), inscriptionController.getById);
router.post('/', verificationToken, isAdmin, inscriptionController.create);
router.delete('/:id', verificationToken, isAdmin, inscriptionController.delete);




module.exports = router;