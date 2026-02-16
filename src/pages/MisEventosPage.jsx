import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchEventsThunk, leaveEvent } from "../redux/slices/eventsSlice";

export default function MisEventosPage() {
    const dispatch = useDispatch();
    const { items: events, joined, loading } = useSelector((state) => state.events);

    useEffect(() => {
        if (events.length === 0) {
            dispatch(fetchEventsThunk());
        }
    }, [dispatch, events.length]);

    const MisEventos = events.filter(event => joined.includes(event.id));

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-3">
                    <span className="text-green-500">🎫</span> Mis Eventos
                </h1>
                <p className="text-lg text-slate-500">Gestiona tu agenda y prepárate para la acción.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-96 bg-slate-200 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : MisEventos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MisEventos.map((event) => (
                        <div key={event.id} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-200">
                                    Inscrito
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                                    {event.title}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                    <span>🗓️</span> {event.date} • {event.location}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                                    {event.description}
                                </p>
                                <button
                                    onClick={() => dispatch(leaveEvent(event.id))}
                                    className="w-full py-3 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-all"
                                >
                                    Cancelar Inscripción
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                    <span className="text-6xl block mb-6">📅</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">No tienes eventos programados</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Explora los próximos eventos y apúntate a los que más te interesen.
                    </p>
                    <Link
                        to="/eventos"
                        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Ver Eventos Disponibles
                    </Link>
                </div>
            )}
        </div>
    );
}
