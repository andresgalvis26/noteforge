const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // Importar controladores de usuario


router.post('/register', registerUser); // Ruta para registrar un nuevo usuario

router.post('/login', loginUser); // Ruta para iniciar sesión


module.exports = router; // Exportar las rutas de usuario