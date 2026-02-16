import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error cargando favoritos", e);
  }
  return [];
};

const initialState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter(item => item !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    }
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;

export const selectIsFavorite = (state, gameId) => state.favorites.items.includes(gameId);

export default favoritesSlice.reducer;
