const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/controllerModule');
const { verificationToken, isAdmin } = require('../middlewares/middlewareAuth');
//route pour recuperer les modules
router.get('/', verificationToken, isAdmin, moduleController.getAll);
//route pour recuperer un module par son id
router.get('/:id', verificationToken, isAdmin, moduleController.getById);
//route pour ajouter un nouveau module 
router.post('/', verificationToken, isAdmin, moduleController.create);



module.exports = router;