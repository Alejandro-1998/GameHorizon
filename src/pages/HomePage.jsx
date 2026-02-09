import { useState, useEffect } from "react";
import { Link } from "react-router";
import Carousel from "../components/Carousel";

import { getPopularGames } from "../services/api";

import GameCard from "../components/GameCard";

export default function HomePage() {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames(1, 12);
        setPopularGames(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen space-y-16 pb-20">

      {/* Hero Carrusel */}
      <section className="container mx-auto px-4 pt-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-fuchsia-600 tracking-tight mb-2">
            Bienvenido a <span className="text-gradient">GameHorizon</span>
          </h1>
          <p className="text-lg">Descubre, explora y juega sin límites.</p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-fuchsia-600">Top Lanzamientos 2025</h2>
        </div>

        <Carousel />
      </section>


      {/* Juegos Populares */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-fuchsia-600 flex items-center gap-2">
              <span className="text-4xl">🏆</span> Los Más Populares
            </h2>
            <p className="mt-1">Leyendas de todos los tiempos que debes jugar</p>
          </div>
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            Ver Catálogo Completo
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-3/4 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

      </section>

      {/* Secciones Funcionalidad Página */}
      <section className="container mx-auto px-4 py-20 space-y-32">
        {/* Búsqueda */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center text-3xl text-indigo-600 mb-2">🔍</div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Encuentra exactamente <br /> lo que buscas.</h2>
            <p className="text-lg leading-relaxed">
              Nuestra potente herramienta de búsqueda te permite filtrar por género, plataforma y más.
              Descubre joyas ocultas en nuestra inmensa base de datos de videojuegos.
            </p>
            <Link to="/catalogo" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors text-lg">
              Empezar a buscar <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-indigo-600 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="flex-1 bg-slate-100 rounded-full h-8 ml-4"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-slate-50 rounded-xl flex items-center px-4 gap-4">
                    <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exploración */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center text-3xl text-purple-600 mb-2">🚀</div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Explora las últimas <br /> tendencias globales.</h2>
            <p className="text-lg leading-relaxed">
              Mantente siempre un paso adelante. Nuestras listas de popularidad se actualizan en tiempo real
              para mostrarte qué está jugando el mundo ahora mismo.
            </p>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4 -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="bg-white p-6 rounded-3xl shadow-lg h-48 flex flex-col justify-end border border-slate-100">
                <span className="text-4xl mb-2">🔥</span>
                <span className="font-bold text-slate-800">Hot Lists</span>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg h-48 flex flex-col justify-end border border-slate-100 mt-8">
                <span className="text-4xl mb-2">⭐</span>
                <span className="font-bold text-slate-800">Top Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Favoritos y Visuales */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center text-3xl text-red-500 mb-2">❤️</div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Tu colección, <br /> a tu manera.</h2>
            <p className="text-lg leading-relaxed">
              Guarda tus juegos favoritos para acceder a ellos rápidamente.
              Disfruta de galerías de capturas en alta resolución y etiquetas interactivas
              para navegar por géneros y plataformas con un solo clic.
            </p>
            <Link to="/favoritos" className="inline-flex items-center text-red-500 font-bold hover:text-red-700 transition-colors text-lg">
              Ver mis favoritos <span className="ml-2">→</span>
            </Link>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="font-bold text-lg text-slate-800">Mis Favoritos</div>
                <div className="text-red-500">❤️</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video bg-slate-100 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón Catálogo Bottom */}
      <section className="container mx-auto px-4 pb-20 pt-10 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-30"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">¿Listo para tu próxima aventura?</h2>
            <p className="text-white text-xl">Únete a GameHorizon y empieza a descubrir mundos increíbles hoy mismo.</p>
            <Link to="/catalogo" className="inline-block px-10 py-5 bg-white text-slate-900 font-bold rounded-full text-xl hover:scale-105 transition-transform shadow-2xl hover:shadow-indigo-500/20">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}