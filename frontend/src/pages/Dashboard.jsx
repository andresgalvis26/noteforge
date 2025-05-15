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

        console.log('Token:', token); // Agregar un log para depuración

        try {
            const res = await axios.get('http://localhost:5126/api/notes/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;