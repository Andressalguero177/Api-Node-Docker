const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Configuración de middleware
const { setupMiddleware } = require('./config/middleware');
setupMiddleware(app);

// Configuración de la conexión a la base de datos
const db = require('./config/db');

// Configuración de rutas
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.send('API CRUD funcionando');
});

// Configuración del servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`http://localhost:3000/users`);
});
