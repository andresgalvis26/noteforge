const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para la creación de tokens

const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Desestructurar el cuerpo de la solicitud

    try {
        // Validar si el usuario ya existe
        const existe = await User.findOne({ email });
        if (existe) return res.status(400).json({ message: 'El usuario ya existe' });

        const user = await User.create({ name, email, password }); // Crear y guardar el nuevo usuario en la base de datos

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generarJWT(user._id) // Generar un token JWT para el usuario
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error }); // Manejo de errores
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }); // Buscar el usuario por correo electrónico
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' }); // Manejo de error si el usuario no existe

        const isMatch = await bcrypt.compare(password, user.password); // Comparar la contraseña proporcionada con la almacenada
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' }); // Manejo de error si la contraseña no coincide

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generarJWT(user._id) // Generar un token JWT para el usuario
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message }); // Manejo de errores
    }
}

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generar un token JWT con el ID del usuario y una expiración de 30 días
}

module.exports = {
    registerUser,
    loginUser
}