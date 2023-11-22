const express = require('express');
const router = express.Router();
const aprendizController = require('../controllers/aprendizController');
const Aprendiz = require('../models/Aprendiz');

// Ruta para obtener todos los aprendices con paginación
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await Aprendiz.paginate({}, options);

    res.json({
      data: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener datos paginados.');
  }
});

// Ruta para obtener aprendices filtrados por identificación
router.get('/filtrados', async (req, res) => {
  try {
    const { identificacion } = req.query;

    // Verifica si se proporcionó un número de identificación
    if (!identificacion) {
      return res.status(400).json({ error: 'Se requiere un número de identificación.' });
    }

    const aprendices = await Aprendiz.find({ identificacion });

    res.json({
      data: aprendices,
      totalDocs: aprendices.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener aprendices filtrados por identificación.');
  }
});

router.post('/', aprendizController.crearAprendiz);
router.get('/:id', aprendizController.obtenerAprendiz);
router.put('/:id', aprendizController.editarAprendiz);
router.delete('/:id', aprendizController.eliminarAprendiz);

module.exports = router;
