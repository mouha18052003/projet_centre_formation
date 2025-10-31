const express = require('express');
const router = express.Router();

const routeSession = require('../controllers/controllerSession');
const { verificationToken, isAdmin } = require('../middlewares/middlewareAuth');

//route pour recuperer les sessions
router.get('/', verificationToken, isAdmin, routeSession.getAll);
//route pour recuperer une session par son id
router.get('/:id', verificationToken, isAdmin, routeSession.getById);
//route pour creer une nouvelle session
router.post('/', verificationToken, isAdmin, routeSession.create);


module.exports = router; 