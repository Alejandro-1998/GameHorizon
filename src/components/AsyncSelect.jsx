import { useState, useEffect, useRef } from 'react';

export default function AsyncSelect({ label, loadOptions, value, onChange, placeholder = "Buscar..." }) {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Initial load
    useEffect(() => {
        fetchOptions("");
    }, []);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const fetchOptions = async (searchQuery) => {
        setLoading(true);
        try {
            const results = await loadOptions(searchQuery);
            setOptions(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        // Debounce simple
        const timeoutId = setTimeout(() => {
            fetchOptions(val);
        }, 500);
        return () => clearTimeout(timeoutId);
    };

    const handleSelect = (option) => {
        const isSelected = value.find(v => v.slug === option.slug);
        let newValue;
        if (isSelected) {
            newValue = value.filter(v => v.slug !== option.slug);
        } else {
            newValue = [...value, { slug: option.slug, name: option.name }];
        }
        onChange(newValue);
        setQuery("");
    };

    const handleRemove = (slug) => {
        const newValue = value.filter(v => v.slug !== slug);
        onChange(newValue);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{label}</label>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map(v => (
                    <span key={v.slug} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {v.name}
                        <button onClick={() => handleRemove(v.slug)} className="hover:text-indigo-900 font-bold">×</button>
                    </span>
                ))}
            </div>

            {/* Input Trigger */}
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder={value.length > 0 ? "Añadir otro..." : placeholder}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-slate-400 text-sm">Cargando...</div>
                    ) : options.length > 0 ? (
                        options.map(option => {
                            const isSelected = value.some(v => v.slug === option.slug);
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700'}`}
                                >
                                    {option.name}
                                    {isSelected && <span className="float-right">✓</span>}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-4 text-center text-slate-400 text-sm">No hay resultados</div>
                    )}
                </div>
            )}
        </div>
    );
}
