const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

function setupMiddleware(app) {
  // Configuración de Helmet para proteger la app
  app.use(helmet());

  // Configuración de CORS
  app.use(cors());

  // Configuración de express-session
  app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: true,
  }));

  // Limitación de tasa de peticiones
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limitar cada IP a 100 solicitudes por ventana
  });
  app.use(limiter);

  // Middleware para analizar cuerpos de solicitudes JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

module.exports = { setupMiddleware };
