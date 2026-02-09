import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getGameDetails, getGameScreenshots } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

export default function JuegoDetallesPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Favoritos
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = game ? isFavorite(game.id) : false;

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {

                const [detailsData, screenshotsData] = await Promise.all([
                    getGameDetails(id),
                    getGameScreenshots(id)
                ]);
                setGame(detailsData);
                setScreenshots(screenshotsData || []);
            } catch (error) {
                console.error("Error fetching game details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
                <h2 className="text-3xl font-bold mb-4">Juego no encontrado</h2>
                <Link to="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-slate-50 relative">

            {/* Overlay Clarito */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Zoomed Screenshot"
                        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
                    />
                    <button className="absolute top-8 right-8 text-white text-4xl font-bold p-4 hover:text-indigo-400 transition-colors">
                        &times;
                    </button>
                </div>
            )}

            {/* Hero */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-slate-900/40 to-black/30"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 mb-8">
                    <div className="container mx-auto">
                        <Link to="/" className="inline-block mb-6 text-white/80 hover:text-white transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full text-sm">
                            ← Volver
                        </Link>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl tracking-tight leading-none">
                                {game.name}
                            </h1>
                            <button
                                onClick={() => toggleFavorite(game.id)}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all text-white border border-white/10"
                                title={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={favorite ? "#EF4444" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`w-8 h-8 transition-transform ${favorite ? 'scale-110 text-red-500' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-white/90 font-medium text-lg">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                                {game.metacritic ? game.metacritic : 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                                ⭐ {game.rating} / 5
                            </span>
                            <span>•</span>
                            <span>{game.released?.split('-')[0]}</span>
                            <span>•</span>
                            <span>{game.playtime} horas de juego</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Sobre el Juego */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="text-3xl">📝</span> Sobre el juego
                            </h2>
                            <div
                                className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: game.description }}
                            />
                        </div>

                        {/* Galería de Capturas */}
                        {screenshots.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                    <span className="text-3xl">📸</span> Capturas de Pantalla
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {screenshots.map((s) => (
                                        <div
                                            key={s.id}
                                            className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-zoom-in relative aspect-video"
                                            onClick={() => setSelectedImage(s.image)}
                                        >
                                            <img
                                                src={s.image}
                                                alt="Screenshot"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Información */}
                    <div className="space-y-6 h-fit sticky top-24">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Información</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Géneros</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {game.genres?.map(g => (
                                            <Link
                                                key={g.id}
                                                to={`/catalogo?genre=${g.id}`}
                                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100 hover:bg-indigo-100 hover:shadow-sm transition-all"
                                            >
                                                {g.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Plataformas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {game.parent_platforms?.map(({ platform }) => (
                                            <Link
                                                key={platform.id}
                                                to={`/catalogo?platform=${platform.id}`}
                                                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-200 hover:shadow-sm transition-all"
                                            >
                                                {platform.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {game.tags?.slice(0, 10).map(t => (
                                            <Link
                                                key={t.id}
                                                to={`/catalogo?tags=${t.slug}`}
                                                className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium border border-slate-100 hover:bg-slate-100 transition-all"
                                            >
                                                #{t.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Publishers</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {game.publishers?.map(p => (
                                            <Link
                                                key={p.id}
                                                to={`/publishers/${p.id}`}
                                                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium border border-orange-100 hover:bg-orange-100 hover:shadow-sm transition-all"
                                            >
                                                {p.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Desarrollador</h4>
                                    <p className="text-slate-700 font-medium">
                                        {game.developers?.map(d => d.name).join(', ')}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Lanzamiento</h4>
                                    <p className="text-slate-700 font-medium">
                                        {new Date(game.released).toLocaleDateString()}
                                    </p>
                                </div>

                                {game.website && (
                                    <div className="pt-4 border-t border-slate-100">
                                        <a href={game.website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200">
                                            Visitar Sitio Oficial
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
