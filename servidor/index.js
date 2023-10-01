const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 4000;

conectarDB();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/aprendices', require('./routes/aprendizRoutes'));
app.use('/api/auth', require('./routes/auth.routes.js'));

// Middleware para redirigir solicitudes no coincidentes a index.html
app.use(express.static(path.join(__dirname, '../angular/src/app/components/reset-password')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../angular/src/app/components/reset-password', 'reset-password.component.html'));
});

app.listen(PORT, () => {
  console.log('Servidor funcionando en el puerto', PORT);
});
