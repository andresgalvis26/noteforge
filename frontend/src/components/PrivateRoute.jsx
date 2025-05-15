import { Navigate } from 'react-router-dom';

//! Define el componente PrivateRoute, que recibe "children" como prop
//! "children" es el componente que se quiere renderizar (ej: Dashboard, EditNote, etc.)
function PrivateRoute({ children }) {

    // Intenta obtener el token guardado en el localStorage del navegador
    // Si no hay token, se interpreta que el usuario no está autenticado
    const token = localStorage.getItem('token');

    // Si hay token, se permite renderizar el componente hijo (contenido protegido)
    // Si no hay token, se redirige al usuario a la ruta "/login" usando Navigate
    // El atributo "replace" evita que la URL protegida quede en el historial
    return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;