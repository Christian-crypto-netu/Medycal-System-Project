const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 4000;

conectarDB();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/aprendices', require('./routes/aprendizRoutes'));
app.use('/api/auth', require('./routes/auth.routes.js'));

app.listen(PORT, () => {
  console.log('Servidor funcionando en el puerto', PORT);
});
