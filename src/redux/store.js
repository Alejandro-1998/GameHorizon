import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import gamesReducer from './slices/gamesSlice';
import detailsReducer from './slices/detailsSlice';
import publishersReducer from './slices/publishersSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        games: gamesReducer,
        details: detailsReducer,
        publishers: publishersReducer,
    },
});
