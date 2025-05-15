// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuario
const noteRoutes = require('./routes/noteRoutes'); // Importar rutas de notas

dotenv.config(); // Cargar variables de entorno desde .env

const app = express(); // Crear una instancia de Express
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON en las solicitudes


// Conectar a la base de datos MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err)); // Manejo de errores de conexión


app.get('/', (req, res) => {
    res.send('API funcionando correctamente ✅'); // Respuesta para la ruta raíz
});

app.use('/api/users', userRoutes); // Usar las rutas de usuario en la ruta /api/users

app.use('/api/notes', noteRoutes); // Usar las rutas de notas en la ruta /api/notes


const PORT = process.env.PORT || 5000; // Puerto del servidor, por defecto 5000
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)); // Iniciar el servidor