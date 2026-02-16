import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishersThunk } from "../redux/slices/publishersSlice";
import PublisherCard from "../components/PublisherCard";

export default function PublisherCatalogPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { items: publishers, count: totalPublishers, loading } = useSelector((state) => state.publishers);

    const page = parseInt(searchParams.get("page")) || 1;
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const PAGE_SIZE = 24;

    // Publishers
    useEffect(() => {
        dispatch(fetchPublishersThunk(search, page, PAGE_SIZE));

        const params = {};
        if (search) params.search = search;
        if (page > 1) params.page = page;
        setSearchParams(params);
    }, [dispatch, page, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", 1);
            return newParams;
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    // Paginación
    const totalPages = Math.ceil(totalPublishers / PAGE_SIZE);

    const handlePrevious = () => {
        if (page > 1) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set("page", page - 1);
                return newParams;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set("page", page + 1);
                return newParams;
            });
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
                                onClick={() => { setSearch(""); setSearchParams({ page: 1 }); }}
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

                {/* --- Main --- */}
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
