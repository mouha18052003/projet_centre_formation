const express = require ('express');
const router = express.Router();
const controllerSalle = require('../controllers/controllerSalle');


router.get('/', controllerSalle.getAll);
router.get('/:id', controllerSalle.getById);


module.exports = router;