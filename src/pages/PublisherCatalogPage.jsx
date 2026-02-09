import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { getPublishers } from "../services/api";
import PublisherCard from "../components/PublisherCard";

export default function PublisherCatalogPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPublishers, setTotalPublishers] = useState(0);

    // Filters state
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const PAGE_SIZE = 24;

    // Fetch publishers
    useEffect(() => {
        loadPublishers();
        setSearchParams({ search });
    }, [page, search]);

    const loadPublishers = async () => {
        setLoading(true);
        try {
            // Note: getPublishers in api.js currently returns data.results directly. 
            // We need to modify getPublishers to return the full object { count, results } 
            // OR finding a way to get the count. 
            // Looking at api.js, getPublishers returns data.results. 
            // I will need to update api.js to return the full response or handle it here.
            // For now, I'll assume I need to tweak api.js or use what I have.
            // Actually, let's look at getGames. It returns full data.
            // I should update getPublishers in api.js to return full data to support pagination properly.
            // Wait, I updated getPublishers earlier to return data.results. 
            // I should verify api.js again.

            // Re-checking api.js... existing getPublishers returns data.results.
            // I'll need to update it to return { count, results } like getGames does.
            // I will do that in the next step. For now, I'll write this component anticipating that change.
            const data = await getPublishers(search, page, PAGE_SIZE);

            // Handling the expected new format
            if (data.results) {
                setPublishers(data.results);
                setTotalPublishers(data.count || 0);
            } else {
                // Fallback if I haven't updated api.js yet (it returns just array)
                setPublishers(data || []);
                setTotalPublishers(0);
            }
        } catch (error) {
            console.error("Error fetching publishers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    // Pagination
    const totalPages = Math.ceil(totalPublishers / PAGE_SIZE);

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

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                {/* --- Sidebar Filtros --- */}
                <aside className="w-full md:w-1/4 space-y-8">
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Filtros</h3>
                            <button
                                onClick={() => { setSearch(""); setPage(1); }}
                                className="text-xs text-indigo-600 font-bold hover:underline"
                            >
                                Limpiar
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Búsqueda */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Buscar Publisher</label>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Nintendo, Ubisoft..."
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-slate-800">Explorar Publishers</h1>
                        <span className="text-slate-500 font-medium">{totalPublishers} resultados</span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="aspect-4/3 bg-slate-200 rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : publishers.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {publishers.map((pub) => (
                                    <PublisherCard key={pub.id} publisher={pub} />
                                ))}
                            </div>

                            {/* Pagination */}
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
                            <span className="text-4xl block mb-4">🏢</span>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No se encontraron publishers</h3>
                            <p className="text-slate-500">Intenta con otro término de búsqueda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
