import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register () {

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
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || 'Error al registrar');
        }
    }



    return (
        <div>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <br />

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

                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
};

export default Register;