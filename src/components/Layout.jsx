import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

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
                            to="/favoritos"
                            className={`p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 ${isActive('/favoritos')}`}
                            title="Mis Favoritos"
                        >
                            ❤️
                        </Link>
                        <Link
                            to="/catalogo"
                            className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>Explorar Catálogo</span>
                        </Link>
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