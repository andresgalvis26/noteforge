import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: '', content: '', tags: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        toast.success('Nota cargada con éxito 🎉');

        const fetchNote = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No se encontró el token. Inicia sesión nuevamente.');
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5126/api/notes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const noteToEdit = res.data.find(note => note._id === id);
                setNote({
                    title: noteToEdit?.title || '',
                    content: noteToEdit?.content || '',
                    tags: noteToEdit?.tags ? noteToEdit.tags.join(', ') : '' // Convertir el array de etiquetas a una cadena separada por comas
                });
            } catch (error) {
                if (error.response?.status === 401) {
                    setError('Sesión no válida. Inicia sesión nuevamente.');
                    navigate('/login');
                } else {
                    setError('Error al obtener la nota');
                }
            }
        }
        fetchNote();
    }, [id, navigate]);

    const handleChange = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const dataToSend = {
            ...note,
            tags: note.tags ? note.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [] // Convertir las etiquetas a un array, quitar espacios y filtrar etiquetas vacías
        }

        try {
            await axios.put(`http://localhost:5126/api/notes/${id}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Nota actualizada con éxito 🎉');
            navigate('/dashboard'); // Redirigir al dashboard después de editar la nota
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Sesión no válida. Inicia sesión nuevamente.');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.message || 'Error al editar la nota');
                // setError(error.response?.data?.msg || 'Error al editar la nota');
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white p-8 py-10 rounded-md shadow-md w-full max-w-lg'
        >
            <h2 className='text-2xl font-bold mb-2 text-center text-palette-primary-03'>Editar nota</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
                Edita el título y contenido de tu nota.
            </p>

            <input
                type="text"
                name="title"
                placeholder="Título"
                value={note.title}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <br />

            <textarea
                name="content"
                placeholder="Contenido"
                value={note.content}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows="10"
            ></textarea>

            <br />

            <input
                type="text"
                name="tags"
                placeholder="Etiquetas (separadas por comas)"
                value={note.tags || ''}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
            </input>

            <div className="flex gap-x-2">
                <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className='w-full bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200'
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className='w-full bg-palette-primary-03 text-white font-bold py-2 px-4 rounded-md hover:bg-palette-primary-04 transition duration-200'
                >
                    Actualizar nota
                </button>
            </div>

        </form>
    )

}

export default EditNote;