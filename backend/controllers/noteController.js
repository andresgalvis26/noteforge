const Note = require('../models/Note');

// GET: Todas las notas del usuario
const  getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id}).sort({ updatedAt: -1 }); // Obtener todas las notas del usuario y ordenarlas por fecha de actualización

    res.json(notes); // Enviar la respuesta con las notas
}

// POST: Crear nueva nota
const createNote = async (req, res) => {
    const { title, content, tags } = req.body; // Desestructurar el cuerpo de la solicitud
    if (!title || !content) return res.status(400).json({ message: 'Título y contenido son obligatorios'})

    const note = await Note.create({
        user: req.user._id, // Asignar el ID del usuario a la nota
        title,
        content,
        tags
    });

    res.status(201).json(note); // Enviar la respuesta con la nota creada
}

// PUT: Actualizar nota
const updateNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    // Verificar si la nota existe y pertenece al usuario
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });

    if (note.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'No autorizado' });

    note.title = req.body.title || note.title; // Actualizar el título si se proporciona
    note.content = req.body.content || note.content; // Actualizar el contenido si se proporciona
    note.tags = req.body.tags || note.tags; // Actualizar las etiquetas si se proporcionan
    const updatedNote = await note.save(); // Guardar los cambios en la nota

    res.json(updatedNote); // Enviar la respuesta con la nota actualizada
}

// DELETE: Eliminar nota
const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id); // Buscar la nota por ID

    // Verificar si la nota existe
    if (!note) return res.status(404).json({ message: 'Nota no encontrada '});

    // Verificar si la nota pertenece al usuario
    if (note.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'No autorizado' });

    await note.deleteOne({ id: note._id }); // Eliminar la nota de la base de datos

    res.json({ message: 'Nota eliminada' }); // Enviar la respuesta de éxito
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}