const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password, secretKey } = req.body;

  try {
    // Verificar si el nombre de usuario existe en la base de datos
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Enviar el token en la respuesta
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in server or logging in' });
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Crear el nuevo usuario
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in server or creating user' });
  }
};

module.exports = {
  login,
  createUser
};
