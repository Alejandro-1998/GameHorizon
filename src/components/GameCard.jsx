import { Link } from "react-router";
import { useFavorites } from "../context/FavoritesContext";

export default function GameCard({ game }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(game.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(game.id);
    };

    return (
        <Link
            to={`/game/${game.slug}`}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-slate-100 block h-full"
        >
            <div className="aspect-3/4 relative overflow-hidden">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Botón Favoritos */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md bg-black/30 hover:bg-white/20 transition-all group-hover:opacity-100 opacity-100 sm:opacity-0"
                    title={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={favorite ? "#EF4444" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`w-6 h-6 transition-transform hover:scale-110 ${favorite ? 'text-red-500' : 'text-white'}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="font-bold text-lg leading-tight mb-1">{game.name}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-2">
                        {game.genres?.slice(0, 3).map(g => (
                            <span key={g.id} className="bg-white/10 px-2 py-0.5 rounded">{g.name}</span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-green-400 font-medium">
                            {game.metacritic ? <span className="p-0.5 border border-green-400 rounded text-[10px]">{game.metacritic}</span> : null}
                            <span>⭐ {game.rating}</span>
                        </span>
                        <span>{game.released?.split('-')[0]}</span>
                    </div>
                </div>
            </div>
            <div className="p-4 block sm:hidden">
                <h3 className="font-bold text-slate-800 truncate">{game.name}</h3>
                <p className="text-xs mt-1">{game.genres?.map(g => g.name).join(', ')}</p>
            </div>
        </Link>
    );
}
