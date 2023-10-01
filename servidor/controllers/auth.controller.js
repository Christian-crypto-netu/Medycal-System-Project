const User = require('../models/user.model.js');
const transport = require('../config/emailConfig.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el nombre de usuario o el email existe en la base de datos
    let user;

    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Por favor, proporciona un nombre de usuario o correo electrónico.' });
    }

    console.log('User:', user); // Agregar registro de depuración

    // Verificar la contraseña

    const isMatch = await user.comparePassword(password);
    console.log('isMatch:', isMatch); // Agregar registro de depuración

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Obtener la clave secreta desde las variables de entorno
    const secretKey = process.env.secretKey;

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Enviar el token en la respuesta
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor o al iniciar sesión' });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }else if (existingEmail) {
      return res.status(403).json({ message: 'Email already exists' });
    }

    // Crear el nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in server or creating user' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Iniciando proceso de envio de correo...');

    // Obtener la clave secreta desde las variables de entorno
    const secretKey = process.env.secretKey;

    console.log('Valor de la clave: ', secretKey);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si hay un token de restablecimiento válido antes de enviar otro
    if (user.resetPasswordToken && !user.resetPasswordUsed && user.resetPasswordExpires > Date.now()) {
      return res.status(400).json({ message: 'Ya se ha enviado un correo de restablecimiento de contraseña. Por favor, revise su bandeja de entrada o espere antes de enviar otro.' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Asigna los valores del token y su expiración al usuario
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de expiración
    user.resetPasswordUsed = false;

    await user.save();

    const mailOptions = {
      from: 'medycalsystemproject@gmail.com',
      to: user.email,
      subject: 'Recuperación de Contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="http://localhost:4200/reset-password/${token}">Restablecer Contraseña</a>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return res.status(500).json({ message: 'Error al enviar el correo de recuperación' });
      } else {
        console.log('Correo electrónico enviado:', info.response);
        console.log('Proceso de envio de correo completado con éxito');
        res.status(200).json({ message: 'Correo de recuperación enviado' });
      }
    });
  } catch (error) {
    console.log('Error en la función forgotPassword:', error);
    res.status(500).json({ message: 'Error en el servidor o al enviar el correo de recuperación' });
  }
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    console.log('Iniciando proceso de restablecimiento de contraseña...');

    // Obtener la clave secreta desde las variables de entorno
    const secretKey = process.env.secretKey;

    console.log('Valor de la clave: ', secretKey);

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, secretKey);

    const userId = decoded.userId;

    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', user.username);

    // Verificar si el token ha sido utilizado o ha caducado
    if (user.resetPasswordUsed || user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({ message: 'El enlace de restablecimiento de contraseña es inválido o ha caducado' });
    }

    // Hashear la nueva contraseña utilizando el mismo salt registrado durante el registro
    const salt = user.salt; // Obtén el salt almacenado
    console.log('Salt en el restablecimiento de contraseña:', salt);
    const hash = await bcrypt.hash(newPassword, salt);

    console.log('Nueva contraseña hasheada:', hash);

    // Actualizar la contraseña y marcar el token como utilizado
    user.password = hash;
    user.resetPasswordUsed = true;
    await user.save();

    // Generar un nuevo token JWT con la nueva contraseña
    const newToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    console.log('Contraseña actualizada con éxito');
    res.status(200).json({ message: 'Contraseña actualizada con éxito', token: newToken });
  } catch (error) {
    console.log('Error en la función resetPassword:', error);
    res.status(500).json({ message: 'Error en el servidor o al restablecer la contraseña', error: error.message });
  }
};







module.exports = {
  login,
  createUser,
  forgotPassword,
  resetPassword
};
