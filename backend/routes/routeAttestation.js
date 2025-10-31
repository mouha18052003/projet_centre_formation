const express = require('express');
const router = express.Router();

const attestationController = require('../controllers/controllerattestation');
const { verificationToken, autorisationRole, isAdmin } = require('../middlewares/middlewareAuth');

router.get('/', verificationToken, autorisationRole('admin', 'formateur', 'apprenant'), attestationController.getAll);
router.get('/:id', verificationToken, autorisationRole('admin', 'formateur', 'apprenant'), attestationController.getById);
router.post('/', verificationToken, isAdmin, attestationController.create);



module.exports = router;