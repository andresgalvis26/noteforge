import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importamos jwtDecode para decodificar el token JWT
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar alertas
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir al usuario

const AuthContext = createContext(); // Creamos el contexto de autenticación

//| Por qué recibe un children?
// children es una propiedad especial en React que representa los elementos secundarios que se pasan a un componente.
// En este caso, AuthProvider es un componente que envuelve a otros componentes y les proporciona acceso al contexto de autenticación.
// Al recibir children como una propiedad, AuthProvider puede renderizar esos elementos secundarios dentro de su propio árbol de componentes.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            try {
                // Decodificamos el token JWT para obtener la información del usuario
                const decoded = jwtDecode(storedToken);
                setUser({ id: decoded.id }); // Puedes expandir con más datos del token
                setToken(storedToken);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                setUser(null);
                setToken(null);
            } 
        } else {
            // console.log('No hay token en localStorage');
            setUser(null);
            setToken(null);
        }
    }, []);

    const login = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        setUser({ id: decoded.id });
        setToken(token);
    }

    const logout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Cerrar sesión eliminará el token de acceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, eliminar el token y redirigir
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
                navigate('/'); // Redirigimos al usuario a la página de inicio
                Swal.fire('Sesión cerrada', 'Has cerrado sesión con éxito', 'success');
            }
        })
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext); // Hook personalizado para acceder al contexto de autenticación