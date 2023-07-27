const mongoose = require('mongoose');

const aprendizSchema = mongoose.Schema({
  ficha: {
    type: Number,
    require: true
  },
  pFormacion: {
    type: String,
    require: true
  },
  nombre: {
    type: String,
    require: true
  },
  apellido: {
    type: String,
    require: true
  },
  tipoId: {
    type: String,
    require: true
  },
  identificacion: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  telefono: {
    type: Number,
    require: true
  },
  fechaNacimiento: {
    type: String,
    require: true
  },
  ciudad: {
    type: String,
    require: true
  },
  direccion: {
    type: String,
    require: true
  },
  sexo: {
    type: String,
    require: true
  },
  eps: {
    type: String,
    require: true
  },
  numeroEps: {
    type: Number,
    require: true
  },
  padecimientos: {
    type: String,
    require: true
  },
  medicamentos: {
    type: String,
    require: true
  },
  acudiente: {
    type: String,
    require: true
  },
  acudienteId: {
    type: Number,
    require: true
  },
  numAcudiente: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('aprendiz', aprendizSchema);