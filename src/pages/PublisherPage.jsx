import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublisherDetails, getGames } from "../services/api";
import GameCard from "../components/GameCard";
import { useFavorites } from "../context/FavoritesContext";

export default function PublisherPage() {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loadingPublisher, setLoadingPublisher] = useState(true);
    const [loadingGames, setLoadingGames] = useState(true);

    // Pagination state
    const [page, setPage] = useState(1);
    const [totalGames, setTotalGames] = useState(0);
    const PAGE_SIZE = 24;

    const { isFavorite, toggleFavorite } = useFavorites();

    // Fetch Publisher Details (only once when ID changes)
    useEffect(() => {
        const fetchPublisher = async () => {
            setLoadingPublisher(true);
            try {
                const data = await getPublisherDetails(id);
                setPublisher(data);
                // Also reset page when publisher changes
                setPage(1);
            } catch (error) {
                console.error("Error fetching publisher:", error);
            } finally {
                setLoadingPublisher(false);
            }
        };

        if (id) fetchPublisher();
        window.scrollTo(0, 0);
    }, [id]);

    // Fetch Games (when ID or Page changes)
    useEffect(() => {
        const fetchGames = async () => {
            setLoadingGames(true);
            try {
                const data = await getGames({ publishers: id, page, pageSize: PAGE_SIZE });
                setGames(data.results || []);
                setTotalGames(data.count || 0);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoadingGames(false);
            }
        };

        if (id) fetchGames();
    }, [id, page]);

    // Pagination handlers
    const totalPages = Math.ceil(totalGames / PAGE_SIZE);

    const handlePrevious = () => {
        if (page > 1) {
            setPage(p => p - 1);
            window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to games section
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(p => p + 1);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    if (loadingPublisher) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!publisher) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
                <h2 className="text-3xl font-bold mb-4">Publisher no encontrado</h2>
                <Link to="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-slate-50 relative">
            {/* Hero / Header */}
            <div className="relative h-[40vh] w-full overflow-hidden bg-slate-900">
                {publisher.image_background && (
                    <img
                        src={publisher.image_background}
                        alt={publisher.name}
                        className="w-full h-full object-cover opacity-40"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-slate-900/40 to-black/30"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 mb-8">
                    <div className="container mx-auto">
                        <Link to="/catalogo" className="inline-block mb-6 text-white/80 hover:text-white transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full text-sm">
                            ← Volver al Catálogo
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl tracking-tight leading-none">
                            {publisher.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 -mt-10 relative z-10 space-y-8">

                {/* About Section */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-3xl">🏢</span> Acerca de {publisher.name}
                    </h2>
                    <div
                        className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: publisher.description || "No hay descripción disponible." }}
                    />
                </div>

                {/* Games List */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="text-4xl">🎮</span> Catálogo de Juegos
                        </h2>
                        <span className="text-slate-500 font-medium bg-slate-100 px-4 py-2 rounded-full">
                            {totalGames} títulos
                        </span>
                    </div>

                    {loadingGames ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-3/4 bg-slate-200 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : games.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-slate-100">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={page === 1}
                                        className="px-6 py-2 bg-white border border-slate-200 rounded-full font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ← Anterior
                                    </button>
                                    <span className="font-medium text-slate-600">
                                        Página {page} de {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNext}
                                        disabled={page >= totalPages}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Siguiente →
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 text-lg">No se encontraron juegos para este publisher.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
