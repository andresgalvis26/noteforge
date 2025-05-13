// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); // Cargar variables de entorno desde .env

const app = express(); // Crear una instancia de Express
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

app.get('/', (req, res) => {
    res.send('API funcionando correctamente ✅'); // Respuesta para la ruta raíz
});

const PORT = process.env.PORT || 5000; // Puerto del servidor, por defecto 5000
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)); // Iniciar el servidor