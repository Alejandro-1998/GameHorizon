import { Link } from "react-router";

export default function PublisherCard({ publisher }) {
    return (
        <Link
            to={`/publishers/${publisher.id}`}
            className="group block relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white aspect-4/3"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                {publisher.image_background ? (
                    <img
                        src={publisher.image_background}
                        alt={publisher.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800"></div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg truncate">
                    {publisher.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-white">
                        {publisher.games_count} juegos
                    </span>
                </div>
            </div>
        </Link>
    );
}
