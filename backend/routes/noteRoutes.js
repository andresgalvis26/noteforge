const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController'); // Importar controladores de notas
const { protect } = require('../middleware/authMiddleware'); // Importar middleware de autenticación


// Rutas para obtener y crear notas
router.route('/')
    .get(protect, getNotes)
    .post(protect, createNote); 

router.route('/:id')
    .put(protect, updateNote) // Ruta para actualizar una nota
    .delete(protect, deleteNote); // Ruta para eliminar una nota

module.exports = router; // Exportar las rutas de notas