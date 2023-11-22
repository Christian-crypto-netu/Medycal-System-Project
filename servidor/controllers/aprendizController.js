const Aprendiz = require('../models/Aprendiz');

exports.crearAprendiz = async (req, res) => {
  try {
    // Verificar si la identificación ya existe
    const identificacionExistente = await Aprendiz.findOne({ identificacion: req.body.identificacion });

    if (identificacionExistente) {
      return res.status(400).json({ error: 'La identificación ya está registrada.' });
    }

    // Si la identificación no existe, proceder con la creación del aprendiz
    let aprendiz = new Aprendiz(req.body);
    await aprendiz.save();

    res.send(aprendiz);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}

exports.obtenerAprendices = async(req, res) =>{
  try {
    const aprendices = await Aprendiz.find();
    res.json(aprendices)
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}

exports.obtenerAprendiz = async (req, res) => {
  try {
    let aprendiz = await Aprendiz.findById(req.params.id);

    if (!aprendiz) {
      return res.status(404).send('Aprendiz no encontrado');
    }

    res.json(aprendiz);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};

exports.obtenerAprendicesFiltrados = async (req, res) => {
  try {
    const { identificacion } = req.query;
    const aprendicesFiltrados = await Aprendiz.find({ identificacion });
    res.json(aprendicesFiltrados);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};


exports.editarAprendiz = async (req, res) =>{
  try {
    const {ficha, pFormacion, nombre, apellido, tipoId, identificacion, email, telefono, fechaNacimiento, ciudad, direccion, sexo, eps, numeroEps, padecimientos, medicamentos, acudiente, acudienteId, numAcudiente} = req.body;
    let aprendiz = await Aprendiz.findById(req.params.id);

    if (!aprendiz){
      res.status(500).send('El aprendiz no existe')
    }

    aprendiz.ficha = ficha;
    aprendiz.pFormacion = pFormacion;
    aprendiz.nombre = nombre;
    aprendiz.apellido = apellido;
    aprendiz.tipoId = tipoId;
    aprendiz.identificacion = identificacion;
    aprendiz.email = email;
    aprendiz.telefono = telefono;
    aprendiz.fechaNacimiento = fechaNacimiento;
    aprendiz.ciudad = ciudad;
    aprendiz.direccion = direccion;
    aprendiz.sexo = sexo;
    aprendiz.eps = eps;
    aprendiz.numeroEps = numeroEps;
    aprendiz.padecimientos = padecimientos;
    aprendiz.medicamentos = medicamentos;
    aprendiz.acudiente = acudiente;
    aprendiz.acudienteId = acudienteId;
    aprendiz.numAcudiente = numAcudiente;

    aprendiz = await Aprendiz.findByIdAndUpdate({
      _id:req.params.id
    },aprendiz,{new: true})
    res.json(aprendiz);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}

exports.eliminarAprendiz = async (req, res) => {
  try {
    let aprendiz = await Aprendiz.findById(req.params.id);

    if (!aprendiz) {
      return res.status(404).send('Aprendiz no encontrado');
    }

    await Aprendiz.findByIdAndDelete({ _id: req.params.id });


    res.json({ msg: 'Aprendiz eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};
