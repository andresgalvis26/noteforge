import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewNote () {
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
            navigate('/dashboard'); // Redirigir al dashboard después de crear la nota
        } catch (error) {
            setError(error.response?.data?.msg || 'Error al crear la nota');
        }
    }

    return (
        <div>
            <h2>Crear nueva nota</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <br />

                <textarea
                    name="content"
                    placeholder="Contenido"
                    value={form.content}
                    onChange={handleChange}
                    required
                ></textarea>

                <br />

                <button type="submit">Crear nota</button>
            </form>
        </div>
    )
}

export default NewNote;