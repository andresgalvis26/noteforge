import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useDarkMode from "../hooks/useDarkMode";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <nav className="bg-palette-primary-03 text-white px-6 py-3 shadow flex justify-between items-center dark:bg-palette-primary-04">
            <h1 className="text-lg font-bold tracking-wide">📝 NoteForge</h1>
            <div className="space-x-6 text-sm">

                {user ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => isActive ? "underline font-bold text-white" : "hover:underline"
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/note/new"
                            className={({ isActive }) => isActive ? "underline font-bold text-white" : "hover:underline"
                            }
                        >
                            Nueva Nota
                        </NavLink>
                        <button onClick={logout} className="hover:underline">Cerrar sesión</button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="ml-4 text-sm hover:underline"
                        >
                            {darkMode ? '🌞 Modo claro' : '🌙 Modo oscuro'}
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "underline font-bold text-white" : "hover:underline"
                            }
                        >
                            Iniciar sesión
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => isActive ? "underline font-bold text-white" : "hover:underline"
                            }
                        >
                            Registrarse
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;