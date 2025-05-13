const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importar bcrypt para el hash de contraseñas

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [80, 'El nombre no puede exceder los 80 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validación de formato de correo electrónico
            },
            message: props => `${props.value} no es un correo electrónico válido!`
        }
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    }
}, {
    timestamps: true // Agregar timestamps para createdAt y updatedAt
});


// Hash antes de guardar la contraseña
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, continuar
    this.password = await bcrypt.hash(this.password, 10); // Hash de la contraseña con un salt de 10
    next(); // Continuar al siguiente middleware
});

module.exports = mongoose.model('User', userSchema); // Exportar el modelo de usuario