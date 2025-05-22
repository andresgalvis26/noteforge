import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewNote = () => {
    const [form, setForm] = useState({ title: '', content: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No se encontró el token. Inicia sesión nuevamente.');
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:5126/api/notes/', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Nota creada con éxito 🎉');
            navigate('/dashboard'); // Redirigir al dashboard después de crear la nota
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear la nota');
            // setError(error.response?.data?.message || 'Error al crear la nota');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white p-8 py-10 rounded-md shadow-md w-full max-w-lg'
        >

            <h2 className='text-2xl font-bold mb-2 text-center text-palette-primary-03'>CREAR NUEVA NOTA</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
                Escribe un título y contenido para tu nueva nota.
            </p>

            <input
                type="text"
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <br />

            <textarea
                name="content"
                placeholder="Contenido"
                value={form.content}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows="10"
            ></textarea>

            <br />

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
                    Guardar nota
                </button>
            </div>
        </form>
    )
}

export default NewNote;