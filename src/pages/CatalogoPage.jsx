import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getGames, getGenres, getPlatforms } from "../services/api";
import GameCard from "../components/GameCard";
import { useFavorites } from "../context/FavoritesContext";

export default function CatalogoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [games, setGames] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [platformsList, setPlatformsList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalGames, setTotalGames] = useState(0);

    const { favorites } = useFavorites();

    const [filters, setFilters] = useState({
        search: searchParams.get("search") || "",
        genre: searchParams.get("genre") || "",
        platform: searchParams.get("platform") || "",
        tags: searchParams.get("tags") || "",
        publishers: searchParams.get("publishers") || "",
        year: "",
        ordering: "-added",
        favoritesOnly: false
    });

    const PAGE_SIZE = 24;

    useEffect(() => {
        const loadFiltersData = async () => {
            const [gList, pList] = await Promise.all([getGenres(), getPlatforms()]);
            setGenresList(gList);
            setPlatformsList(pList);
        };
        loadFiltersData();
    }, []);

    useEffect(() => {
        loadGames();
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.genre) params.genre = filters.genre;
        if (filters.platform) params.platform = filters.platform;
        if (filters.tags) params.tags = filters.tags;
        if (filters.publishers) params.publishers = filters.publishers;
        setSearchParams(params);
    }, [page, filters]);

    const loadGames = async () => {
        setLoading(true);
        try {
            let datesParam = "";
            if (filters.year) {
                datesParam = `${filters.year}-01-01,${filters.year}-12-31`;
            }

            let idsParam = "";
            if (filters.favoritesOnly) {
                if (favorites.length === 0) {
                    setGames([]);
                    setTotalGames(0);
                    setLoading(false);
                    return;
                }
                idsParam = favorites.join(',');
            }

            const data = await getGames({
                page,
                pageSize: PAGE_SIZE,
                search: filters.search,
                genre: filters.genre,
                platform: filters.platform,
                tags: filters.tags,
                publishers: filters.publishers,
                dates: datesParam,
                ordering: filters.ordering,
                ids: idsParam
            });

            setGames(data.results || []);
            setTotalGames(data.count || 0);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const totalPages = Math.ceil(totalGames / PAGE_SIZE);

    const handlePrevious = () => {
        if (page > 1) {
            setPage(p => p - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(p => p + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                {/* --- Sidebar Filtros --- */}
                <aside className="w-full md:w-1/4 space-y-8">
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Filtros</h3>
                            <button
                                onClick={() => setFilters({ search: "", genre: "", platform: "", tags: "", publishers: "", year: "", ordering: "-added", favoritesOnly: false })}
                                className="text-xs text-indigo-600 font-bold hover:underline"
                            >
                                Limpiar
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Búsqueda */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Búsqueda</label>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        value={filters.search}
                                        onChange={(e) => handleFilterChange("search", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    />
                                </form>
                            </div>

                            {/* Favoritos */}
                            <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                                <label className="text-sm font-bold text-indigo-800 cursor-pointer select-none" htmlFor="fav-switch">
                                    ❤️ Solo Favoritos
                                </label>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input
                                        type="checkbox"
                                        name="fav-switch"
                                        id="fav-switch"
                                        checked={filters.favoritesOnly}
                                        onChange={(e) => handleFilterChange("favoritesOnly", e.target.checked)}
                                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer duration-200 ease-in-out border-indigo-200 checked:right-0 checked:border-indigo-600 right-5"
                                    />
                                    <label htmlFor="fav-switch" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${filters.favoritesOnly ? 'bg-indigo-600' : 'bg-indigo-200'}`}></label>
                                </div>
                            </div>

                            {/* Orden */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Ordenar por</label>
                                <select
                                    value={filters.ordering}
                                    onChange={(e) => handleFilterChange("ordering", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="-added">Populares</option>
                                    <option value="-released">Lanzamiento (Nuevos)</option>
                                    <option value="-rating">Mejor Valorados</option>
                                    <option value="name">Nombre (A-Z)</option>
                                </select>
                            </div>

                            {/* Genero */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Género</label>
                                <select
                                    value={filters.genre}
                                    onChange={(e) => handleFilterChange("genre", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Todos</option>
                                    {genresList.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Plataforma */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Plataforma</label>
                                <select
                                    value={filters.platform}
                                    onChange={(e) => handleFilterChange("platform", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Todas</option>
                                    {platformsList.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Año */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Año de Lanzamiento</label>
                                <select
                                    value={filters.year}
                                    onChange={(e) => handleFilterChange("year", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Cualquier año</option>
                                    {years.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Main --- */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-slate-800">Catálogo</h1>
                        <span className="text-slate-500 font-medium">{totalGames} juegos encontrados</span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="aspect-3/4 bg-slate-200 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : games.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>

                            {/* Paginación */}
                            <div className="flex justify-center items-center gap-6 mt-12">
                                <button
                                    onClick={handlePrevious}
                                    disabled={page === 1}
                                    className="px-6 py-2 bg-white border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    ← Anterior
                                </button>
                                <span className="font-medium text-slate-600">
                                    Página {page}
                                </span>
                                <button
                                    onClick={handleNext}
                                    disabled={page >= totalPages}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                            <span className="text-4xl block mb-4">🤔</span>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No se encontraron resultados</h3>
                            <p className="text-slate-500">Prueba ajustando los filtros de búsqueda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
