const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para la creación de tokens
const User = require('../models/User'); // Importar el modelo de usuario

const protect = async (req, res, next) => {
    let token; 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del encabezado de autorización
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar el usuario en la base de datos y excluir la contraseña
            req.user = await User.findById(decoded.id).select('-password'); 

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token no válido o ha expirado.'});
        }

        if (!token) {
            return res.status(401).json({ message: 'No autorizado, no se encontró token.'})
        }
    }
}

module.exports = { protect }; // Exportar el middleware de protección