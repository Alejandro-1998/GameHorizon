import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsThunk, joinEvent, leaveEvent } from "../redux/slices/eventsSlice";

export default function EventsPage() {
    const dispatch = useDispatch();
    const { items: events, joined, loading } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEventsThunk());
    }, [dispatch]);

    const handleJoinToggle = (eventId) => {
        if (joined.includes(eventId)) {
            dispatch(leaveEvent(eventId));
        } else {
            dispatch(joinEvent(eventId));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4 flex items-center justify-center gap-3">
                    <span className="text-indigo-500">📅</span> Próximos Eventos
                </h1>
                <p className="text-lg text-slate-500">No te pierdas las mejores convenciones y torneos del mundo gaming.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-96 bg-slate-200 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => {
                        const isJoined = joined.includes(event.id);
                        return (
                            <div key={event.id} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                                        {event.date}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-slate-800 leading-tight">
                                            {event.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                        <span>📍</span> {event.location}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                                        {event.description}
                                    </p>

                                    <button
                                        onClick={() => handleJoinToggle(event.id)}
                                        className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${isJoined
                                                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 shadow-red-100"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                                            }`}
                                    >
                                        {isJoined ? "Cancelar Inscripción" : "Apuntarse al Evento"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
