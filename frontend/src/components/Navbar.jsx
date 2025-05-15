import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/dashboard">Inicio</Link>
            <Link to="/note/new">Nueva Nota</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </nav>
    )    
}

export default Navbar;