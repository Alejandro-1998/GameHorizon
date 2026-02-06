import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingGames } from "../services/api";

export default function Carousel() {
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const results = await getTrendingGames();
                setGames(results);
            } catch (error) {
                console.error("Error fetching carousel games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Efecto Scroll Automático
    useEffect(() => {
        if (games.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games]);

    if (loading) {
        return (
            <div className="w-full h-125 rounded-3xl bg-slate-200 animate-pulse shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 animate-shimmer"></div>
            </div>
        );
    }

    if (games.length === 0) return null;

    return (
        <div className="relative w-full h-125 overflow-hidden rounded-3xl shadow-2xl group border border-slate-100">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {games.map((game) => (
                    <div key={game.id} className="min-w-full h-full relative">
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.6] transition-all duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-linear-to-t from-black/90 via-black/50 to-transparent text-white flex flex-col items-start justify-end h-2/3">
                            <h2 className="text-4xl md:text-6xl font-serif font-black mb-3 translate-y-4 opacity-0 animate-[fade-in-up_0.6s_forwards] delay-100 drop-shadow-lg tracking-wide">
                                {game.name}
                            </h2>
                            <div className="flex items-center gap-4 mb-6 translate-y-4 opacity-0 animate-[fade-in-up_0.6s_forwards] delay-200">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/10">
                                    {game.released?.split('-')[0]}
                                </span>
                                <span className="text-slate-200 text-lg font-medium">
                                    ⭐ {game.rating}
                                </span>
                            </div>
                            <Link
                                to={`/game/${game.slug}`}
                                className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 shadow-lg shadow-black/20 translate-y-4 opacity-0 animate-[fade-in-up_0.6s_forwards] delay-300"
                            >
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navegación */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {games.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full shadow-lg ${idx === currentIndex
                            ? "bg-white w-8 h-2.5 opacity-100"
                            : "bg-white/40 w-2.5 h-2.5 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
