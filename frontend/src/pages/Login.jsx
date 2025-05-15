import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login () {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
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
        <div>
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <br />

                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;