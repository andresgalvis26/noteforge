import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { login } = useAuth(); // ← del contexto
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5126/api/users/login', form);
            login(res.data.token); // ← del contexto
            toast.success('Sesión iniciada con éxito');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Credenciales incorrectas');
        }
    };

    return (
        // <div className='w-full border border-blue-500'>
            // {error && <p style={{ color: 'red' }}>{error}</p>}

            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 py-12 rounded-md shadow-md w-full max-w-md'
            >

                <h2 className='text-2xl font-bold mb-2 text-center text-palette-primary-03'>INICIO DE SESIÓN</h2>
                <p className='text-sm text-gray-500 mb-4 text-center'>Inicia sesión para acceder a tus notas.</p>

                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <br />

                <button 
                    type="submit"
                    className='w-full bg-palette-primary-03 text-white py-2 rounded-md hover:bg-palette-primary-04 transition font-semibold'>
                        Iniciar sesión
                </button>

                <p className='text-sm text-gray-500 mt-4 text-center'></p>
                    ¿No tienes cuenta? <a href="/register" className='text-palette-primary-03 hover:text-palette-primary-04 hover:underline'>Regístrate aquí</a>
            </form>
        // </div>
    );
};

export default Login;