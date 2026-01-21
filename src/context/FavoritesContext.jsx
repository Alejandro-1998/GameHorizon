import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading favorites", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (e) {
            console.error("Error saving favorites", e);
        }
    }, [favorites]);

    const addFavorite = (gameId) => {
        if (!favorites.includes(gameId)) {
            setFavorites((prev) => [...prev, gameId]);
        }
    };

    const removeFavorite = (gameId) => {
        setFavorites((prev) => prev.filter((id) => id !== gameId));
    };

    const isFavorite = (gameId) => {
        return favorites.includes(gameId);
    };

    const toggleFavorite = (gameId) => {
        if (isFavorite(gameId)) {
            removeFavorite(gameId);
        } else {
            addFavorite(gameId);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
