// routes/historial.js

const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

router.post('/historial/:aprendizId', historialController.crearHistorial);
router.get('/historial/:aprendizId', historialController.obtenerHistoriales);
router.get('/historial/fecha/:aprendizId', historialController.obtenerHistorialesPorFecha);
// router.put('/historial/:historialId', historialController.editarHistorial);
router.delete('/historial/:historialId', historialController.eliminarHistorial);
router.get('/historial/pdf/:historialId', historialController.descargarHistorialEnPDF);

module.exports = router;
