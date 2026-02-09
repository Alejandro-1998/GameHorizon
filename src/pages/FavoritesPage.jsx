import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useFavorites } from "../context/FavoritesContext";
import { getGames } from "../services/api";
import GameCard from "../components/GameCard";

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);
            try {
                if (favorites.length === 0) {
                    setGames([]);
                } else {
                    const idsString = favorites.join(',');
                    const data = await getGames({ ids: idsString, pageSize: 40 });
                    setGames(data.results || []);
                }
            } catch (error) {
                console.error("Error loading favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [favorites]);

    return (
        <div className="container mx-auto px-4 min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-3">
                    <span className="text-red-500">❤️</span> Mis Favoritos
                </h1>
                <p className="text-lg text-slate-500">Tu colección personal de juegos destacados.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-3/4 bg-slate-200 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : games.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                    <span className="text-6xl block mb-6">💔</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Aún no tienes favoritos</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Explora el catálogo y marca los juegos que más te gusten con el corazón para guardarlos aquí.
                    </p>
                    <Link
                        to="/catalogo"
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Ir al Catálogo
                    </Link>
                </div>
            )}
        </div>
    );
}
