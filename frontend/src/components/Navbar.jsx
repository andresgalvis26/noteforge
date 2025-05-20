import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-palette-secondary text-white px-6 py-3 shadow flex justify-between items-center">
            <span className="text-lg font-bold tracking-wide">NoteForge</span>
            <div className="space-x-6 text-sm">
                <Link to="/dashboard" className="hover:underline">Inicio</Link>
                <Link to="/note/new" className="hover:underline">Nueva Nota</Link>
                <button onClick={handleLogout} className="hover:underline">Cerrar sesión</button>
            </div>
        </nav>
    )    
}

export default Navbar;