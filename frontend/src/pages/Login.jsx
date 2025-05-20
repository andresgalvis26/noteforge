import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
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
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || 'Error al iniciar sesión');
            // console.error('Error de inicio de sesión:', error); // Agregar un log para depuración
        }
    };

    return (
        // <div className='w-full border border-blue-500'>
            // {error && <p style={{ color: 'red' }}>{error}</p>}

            <form
                onSubmit={handleSubmit}
                className='bg-white border border-red-500 p-8 py-12 rounded-md shadow-md w-full max-w-md'
            >

                <h2 className='text-2xl font-bold mb-2 text-center'>INICIO DE SESIÓN</h2>
                <p className='text-sm text-gray-500 mb-4 text-center'>Inicia sesión para acceder a tu cuenta</p>

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
                    className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-semibold'>
                        Iniciar sesión
                </button>

                <p className='text-sm text-gray-500 mt-4 text-center'></p>
                    ¿No tienes cuenta? <a href="/register" className='text-indigo-600 hover:text-indigo-700'>Regístrate aquí</a>
            </form>
        // </div>
    );
};

export default Login;