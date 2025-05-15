import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchNotes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            const res = await axios.get('http://localhost:5126/api/notes/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data); // Verifica la respuesta de la API
            if (res.data.length === 0) {
                setError('No tienes notas creadas. Crea una nueva nota.');
            } else {
                setError(''); // Limpiar el error si hay notas
            }

            setNotes(res.data);
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Sesión no válida. Inicia sesión nuevamente.');
                navigate('/login');
            } else {
                setError('Error al obtener las notas');
            }
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            await axios.delete(`http://localhost:5126/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchNotes(); // Refrescar la lista de notas después de eliminar 
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Sesión no válida. Inicia sesión nuevamente.');
                navigate('/login');
            } else {
                setError('Error al eliminar la nota');
            }
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Mis notas</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}

            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <span>{note.content}</span>
                        {/* <h6>{note.createdAt}</h6> */}
                        <h5>Fecha de Creación: {new Date(note.createdAt).toLocaleDateString()}</h5>
                        <h5>Fecha de Modificación: {new Date(note.updatedAt).toLocaleDateString()}</h5>
                        <button onClick={() => navigate(`/note/${note._id}/edit`)}>Editar</button>
                        <button onClick={() => handleDelete(note._id)}>Eliminar</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;