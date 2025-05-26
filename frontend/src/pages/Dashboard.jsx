import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const navigate = useNavigate();
    const tagColors = [
        'bg-red-100 text-red-700',
        'bg-green-100 text-green-700',
        'bg-blue-100 text-blue-700',
        'bg-yellow-100 text-yellow-700',
        'bg-purple-100 text-purple-700',
        'bg-pink-100 text-pink-700',
        'bg-indigo-100 text-indigo-700',
        'bg-teal-100 text-teal-700'
    ];

    useEffect(() => {
        fetchNotes();
    }, []);

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

    const getTagColor = (tag) => {
        let hash = 0;

        // Recorre cada carácter de la palabra (ej. "urgente")
        for (let i = 0; i < tag.length; i++) {
            // Convierte el carácter a su código ASCII y actualiza el hash
            hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Asegura que el índice sea positivo y dentro del array
        const index = Math.abs(hash) % tagColors.length;

        // Devuelve el color que le corresponde a ese índice
        return tagColors[index];
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar la nota después de eliminarla!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

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
            toast.success('Nota eliminada con éxito 🗑️');
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

    const filteredNotes = notes.filter(note =>
        (note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase())) &&
        (selectedTag
            ? (note.tags || []).map(tags => tags.trim()).includes(selectedTag.trim())
            : true)
    );

    const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])))

    const tagCount = {};
    notes.forEach(note => {
        (note.tags || []).forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        })
    })

    return (
        <div className='mt-4'>
            {/* Input de búsqueda */}
            <div className='mb-4'>
                <input
                    type="text"
                    placeholder="Buscar nota..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-palette-primary-03 transition duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                </input>
            </div>

            {/* Filtro por etiquetas */}
            <div className='mb-4'>
                <button
                    onClick={() => setSelectedTag('')}
                    className={`px-3 py-2 rounded-full text-sm font-medium ${selectedTag === '' ? 'bg-palette-primary-03 text-white dark:bg-palette-primary-04' : 'bg-gray-200 text-gray-700'} transition duration-200`}
                >
                    Todas
                </button>

                {allTags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-2 rounded-full text-sm font-medium ${selectedTag === tag ? 'bg-palette-primary-03 text-white dark:bg-palette-primary-04' : 'bg-gray-200 text-gray-700'} transition duration-200 ml-2 mb-2`}
                    >
                        #{tag} ({tagCount[tag] || 0})
                    </button>
                ))}
            </div>

            {notes.length === 0 ? (
                <p className='text-xl text-center text-gray-500 text-sm'>
                    📝 Aún no tienes notas creadas. ¡Empieza con una nueva nota!
                </p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {/* <h2 className='text-3xl mb-4 font-bold text-blue-600'>Mis notas</h2> */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {filteredNotes.map(note => (
                        <div
                            key={note._id}
                            className="bg-white shadow-md rounded-md p-4 mb-2 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition duration-200 hover:shadow-lg hover:border-palette-primary-03 cursor-pointer"
                        >
                            <h3 className='text-xl font-semibold text-palette-primary-03 mb-1'>{note.title}</h3>
                            <p className="text-gray-700 mb-2 whitespace-pre-line dark:text-white">{note.content}</p>
                            <div className="text-xs text-gray-400 mb-3">
                                <p>📅 Creación: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p>✏️ Modificación: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-2 flex flex-wrap gap-2">
                                {note.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)} transition duration-200`}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-2 flex gap-6">
                                <button
                                    className="w-full bg-palette-primary-03 rounded-md text-white py-2 transition duration-200 hover:bg-palette-primary-04"
                                    onClick={() => navigate(`/note/${note._id}/edit`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="w-full bg-red-500 rounded-md text-white py-2 transition duration-200 hover:bg-red-700"
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