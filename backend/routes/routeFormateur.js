const express = require('express');
const router = express.Router();

const formateurController = require('../controllers/controllerFormateur');

const { verificationToken, isAdmin, isFormateur } = require('../middlewares/middlewareAuth')


router.get('/', verificationToken, isAdmin, formateurController.getAll);
router.get('/:id', verificationToken, isFormateur, formateurController.getById);
router.post('/', verificationToken, isAdmin, formateurController.create);



module.exports = router;