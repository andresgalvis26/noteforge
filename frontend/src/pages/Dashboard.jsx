import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
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
        <div className='mt-4'>
            {notes.length === 0 ? (
                <p className='text-center text-gray-500 text-sm'>
                    📝 Aún no tienes notas creadas. ¡Empieza con una nueva nota!
                </p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-red-200'>
                    {/* <h2 className='text-3xl mb-4 font-bold text-blue-600'>Mis notas</h2> */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {notes.map(note => (
                        <div
                            key={note._id}
                            className="bg-white shadow-md rounded-md p-4 mb-2 border border-gray-200"
                        >
                            <h3 className='text-xl font-semibold text-indigo-700 mb-1'>{note.title}</h3>
                            <p className="text-gray-700 mb-2 whitespace-pre-line">{note.content}</p>
                            <div className="text-xs text-gray-400 mb-3">
                                <p>📅 Creación: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p>✏️ Modificación: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-2 flex gap-6">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => navigate(`/note/${note._id}/edit`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard;