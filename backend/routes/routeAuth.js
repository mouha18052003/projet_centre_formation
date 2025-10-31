const express = require('express');
const router = express.Router();
const authController = require('../controllers/controllerAuth');


//route d'inscription (apprenant)
router.post('/inscription', authController.inscrirApprenant);

//route de connexion pour tous utilisateur
router.post('/login', authController.login);

module.exports = router;