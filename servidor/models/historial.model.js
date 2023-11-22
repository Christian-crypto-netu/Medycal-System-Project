const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  aprendizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Aprendiz', required: true },
  sintomas: String,
  procedimientos: String,
  medicamentos: String,
  fechaCreacion: { type: Date, default: Date.now }
});

const Historial = mongoose.model('Historial', historialSchema);

module.exports = Historial;
