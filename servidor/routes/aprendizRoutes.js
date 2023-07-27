const express = require('express');
const router = express.Router();
const aprendizController = require('../controllers/aprendizController');


router.post('/', aprendizController.crearAprendiz);
router.get('/', aprendizController.obtenerAprendices);
router.get('/:id', aprendizController.obtenerAprendiz);
router.put('/:id', aprendizController.editarAprendiz);
router.delete('/:id', aprendizController.eliminarAprendiz);

module.exports = router;