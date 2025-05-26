import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importamos jwtDecode para decodificar el token JWT
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar alertas
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir al usuario
import toast from 'react-hot-toast'; // Importamos react-hot-toast para mostrar notificaciones

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
                const decoded = jwtDecode(storedToken); // Decodificamos el token JWT para obtener la información del usuario

                const currentTime = Date.now() / 1000; // Obtenemos el tiempo actual en segundos
                if (decoded.exp < currentTime) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Token expirado',
                        text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        logout(false); // Si el token ha expirado, cerramos sesión
                    })
                }

                setUser({ id: decoded.id });
                setToken(storedToken);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                logout(); // Si hay un error al decodificar el token, cerramos sesión
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

    const logout = async (confirm = true) => {

        if (confirm) {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Cerrar sesión eliminará el token de acceso!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            })

            if (!result.isConfirmed) return; // Si el usuario cancela, no hacemos nada
        }

        localStorage.removeItem('token'); // Eliminamos el token del localStorage
        setUser(null); // Limpiamos el estado del usuario
        setToken(null); // Limpiamos el estado del token
        toast.success('Sesión cerrada con éxito'); // Mostramos una notificación de éxito
        navigate('/'); // Redirigimos al usuario a la página de inicio de sesión
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext); // Hook personalizado para acceder al contexto de autenticación