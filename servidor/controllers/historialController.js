// historialController.js

const Historial = require('../models/historial.model');
const Aprendiz = require('../models/Aprendiz');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

exports.crearHistorial = async (req, res) => {
  try {
    const { aprendizId } = req.params;
    const { sintomas, procedimientos, medicamentos } = req.body;

    console.log("Valor de AprendizId: ", aprendizId);
    // Verificar que el aprendiz existe antes de crear el historial
    const aprendiz = await Aprendiz.findById(aprendizId);
    if (!aprendiz) {
      return res.status(404).json({ error: 'Aprendiz no encontrado' });
    }

    // Si el aprendiz existe, crear el historial
    const nuevoHistorial = new Historial({ aprendizId, sintomas, procedimientos, medicamentos });
    await nuevoHistorial.save();

    res.status(201).json({ mensaje: 'Historial creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el historial' });
  }
};

exports.obtenerHistorialesPorFecha = async (req, res) => {
  try {
    const { aprendizId } = req.params;
    const { fechaInicio, fechaFin } = req.query;

    const query = { aprendizId };

    if (fechaInicio && fechaFin) {
      query.fechaCreacion = { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) };
    }

    const historiales = await Historial.find(query).sort({ fechaCreacion: 'desc' });

    res.status(200).json({ historiales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los historiales por fecha' });
  }
};


exports.obtenerHistoriales = async (req, res) => {
  try {
    const { aprendizId } = req.params;
    const historiales = await Historial.find({ aprendizId }).sort({ fechaCreacion: 'desc' });

    res.status(200).json({ historiales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los historiales' });
  }
};

// exports.editarHistorial = async (req, res) => {
//   try {
//     const { historialId } = req.params;
//     const { sintomas, procedimientos, medicamentos } = req.body;

//     const historial = await Historial.findByIdAndUpdate(historialId, { sintomas, procedimientos, medicamentos }, { new: true });

//     if (!historial) {
//       return res.status(404).json({ error: 'Historial no encontrado' });
//     }

//     res.status(200).json({ mensaje: 'Historial editado exitosamente', historial });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al editar el historial' });
//   }
// };

exports.eliminarHistorial = async (req, res) => {
  try {
    const { historialId } = req.params;

    const historial = await Historial.findByIdAndDelete(historialId);

    if (!historial) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    res.status(200).json({ mensaje: 'Historial eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el historial' });
  }
};

exports.descargarHistorialEnPDF = async (req, res) => {
  try {
    const { historialId } = req.params;

    console.log(`ID del historial a descargar: ${historialId}`);

    const historial = await Historial.findById(historialId);

    if (!historial) {
      console.log('Historial no encontrado');
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    console.log('Historial encontrado:', historial);

    const aprendiz = await Aprendiz.findById(historial.aprendizId);

    if (!aprendiz) {
      console.log('Aprendiz no encontrado');
      return res.status(404).json({ error: 'Aprendiz no encontrado' });
    }

    console.log('Aprendiz encontrado:', aprendiz);

    // Nuevo objeto con las propiedades necesarias para la plantilla Handlebars
    const templateData = {
      historial: {
        fechaCreacion: historial.fechaCreacion,
        sintomas: historial.sintomas,
        procedimientos: historial.procedimientos,
        medicamentos: historial.medicamentos,
      },
      aprendiz: {
        ficha: aprendiz.ficha,
        pFormacion: aprendiz.pFormacion,
        nombre: aprendiz.nombre,
        apellido: aprendiz.apellido,
        tipoId: aprendiz.tipoId,
        identificacion: aprendiz.identificacion,
      },
    };

    console.log('Datos para la plantilla:', templateData);

    // Lee el contenido de una plantilla HTML usando Handlebars
    const templateHtml = fs.readFileSync('./templates/historial.html', 'utf-8');
    const template = handlebars.compile(templateHtml);
    const html = template(templateData);

    console.log('HTML generado:', html);

    // Configuración de puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    // Genera el PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    console.log('PDF generado con éxito');

    // Cierra el navegador
    await browser.close();

    // Envía el PDF como respuesta
    res.type('application/pdf').send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al descargar el historial en PDF' });
  }
};




