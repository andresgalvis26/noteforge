import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: '', content: ''});
    const [error, setError] = useState('');

    useEffect(() => {
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
                    content: noteToEdit?.content || ''
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
    }, [id])

    const handleChange = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:5126/api/notes/${id}`, note, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/dashboard'); // Redirigir al dashboard después de editar la nota
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Sesión no válida. Inicia sesión nuevamente.');
                navigate('/login');
            } else {
                setError(error.response?.data?.msg || 'Error al editar la nota');
            }
        }
    }

    return (
        <div>
            <h2>Editar nota</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={note.title}
                    onChange={handleChange}
                    required
                />

                <br />

                <textarea
                    name="content"
                    placeholder="Contenido"
                    value={note.content}
                    onChange={handleChange}
                    required
                ></textarea>

                <br />

                <button type="submit">Actualizar nota</button>
            </form>
        </div>
    )

}

export default EditNote;