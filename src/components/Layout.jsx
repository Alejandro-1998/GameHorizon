import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';

const Layout = () => {
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";
    };

    return (
        <div className="min-h-screen font-sans text-slate-800">
            {/* --- Navbar --- */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo del sitio */}
                    <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2 group">
                        <span className="text-slate-800 group-hover:text-indigo-600 transition-colors">GameHorizon</span>
                    </Link>

                    {/* Enlaces de navegación */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isActive('/')}`}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/publishers"
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isActive('/publishers')}`}
                        >
                            Publishers
                        </Link>
                        <Link
                            to="/eventos"
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isActive('/eventos')}`}
                        >
                            Eventos
                        </Link>

                        <Link
                            to="/catalogo"
                            className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>Explorar Catálogo</span>
                        </Link>

                        {/* Perfil de Usuario */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden hover:ring-2 hover:ring-indigo-400 transition-all"
                                title="Perfil de Usuario"
                            >
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in-down origin-top-right">
                                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                                        <p className="text-sm font-bold text-slate-800">Usuario Invitado</p>
                                        <p className="text-xs text-slate-500">user@gamehorizon.com</p>
                                    </div>
                                    <Link
                                        to="/favoritos"
                                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        ❤️ Mis Favoritos
                                    </Link>
                                    <Link
                                        to="/mis-eventos"
                                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        🎫 Mis Eventos
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Contenido Principal --- */}
            <main className="container mx-auto px-4 py-8 fade-in">
                <Outlet />
            </main>

            {/* --- Footer --- */}
            <footer className="border-t border-slate-200 py-12 mt-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">GameHorizon</h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        Tu destino número uno para descubrir, explorar y encontrar tu próxima aventura digital.
                    </p>
                    <p className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} GameHorizon - Alejandro Caballero Luque. Hecho con React y Tailwind.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;