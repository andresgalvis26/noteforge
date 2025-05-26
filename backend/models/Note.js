const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Referencia al modelo de usuario
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede exceder los 100 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
        trim: true,
        maxlength: [5000, 'El contenido no puede exceder los 5000 caracteres']
    },
    tags: {
        type: [String], // Array de etiquetas
        default: [] // Por defecto, un array vacío
    }
}, {
    timestamps: true // Agregar timestamps para createdAt y updatedAt
})

module.exports = mongoose.model('Note', noteSchema);