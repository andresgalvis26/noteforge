import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setForm({
            ...form, // Copia el estado actual del formulario
            [e.target.name]: e.target.value // Actualiza solo el campo que se está editando
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5126/api/users/register', form);
            localStorage.setItem('token', res.data.token);
            toast.success('Registro exitoso');
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || 'Error al registrar');
        }
    }



    return (
        // <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-md shadow-md w-full max-w-md'
            >

                <h2 className='text-2xl font-bold mb-2 text-center text-palette-primary-03'>REGISTRO</h2>
                <p className='text-sm text-gray-500 mb-4 text-center'>Crea una cuenta para acceder a tus notas.</p>

                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className='w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

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
                        Crear cuenta
                </button>

                <p className='text-sm text-gray-500 mt-4 text-center'></p>
                    ¿Ya tienes cuenta? <a href="/" className='text-palette-primary-03 hover:text-palette-primary-04 hover:underline'>Inicia sesión aquí</a>
            </form>
        // </div>
    );
};

export default Register;