import { createSlice } from '@reduxjs/toolkit';
import { getPopularGames, getTrendingGames, getGames } from '../../services/api';

const initialState = {
    popular: {
        items: [],
        loading: false,
        error: null,
    },
    trending: {
        items: [],
        loading: false,
        error: null,
    },
    catalog: {
        items: [],
        count: 0,
        loading: false,
        error: null,
    }
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        fetchPopularStart: (state) => {
            state.popular.loading = true;
            state.popular.error = null;
        },
        fetchPopularSuccess: (state, action) => {
            state.popular.loading = false;
            state.popular.items = action.payload;
        },
        fetchPopularFailure: (state, action) => {
            state.popular.loading = false;
            state.popular.error = action.payload;
        },

        fetchTrendingStart: (state) => {
            state.trending.loading = true;
            state.trending.error = null;
        },
        fetchTrendingSuccess: (state, action) => {
            state.trending.loading = false;
            state.trending.items = action.payload;
        },
        fetchTrendingFailure: (state, action) => {
            state.trending.loading = false;
            state.trending.error = action.payload;
        },

        fetchCatalogStart: (state) => {
            state.catalog.loading = true;
            state.catalog.error = null;
        },
        fetchCatalogSuccess: (state, action) => {
            state.catalog.loading = false;
            state.catalog.items = action.payload.results;
            state.catalog.count = action.payload.count;
        },
        fetchCatalogFailure: (state, action) => {
            state.catalog.loading = false;
            state.catalog.error = action.payload;
        }
    },
});

export const {
    fetchPopularStart, fetchPopularSuccess, fetchPopularFailure,
    fetchTrendingStart, fetchTrendingSuccess, fetchTrendingFailure,
    fetchCatalogStart, fetchCatalogSuccess, fetchCatalogFailure
} = gamesSlice.actions;

export const fetchPopularGamesThunk = (page = 1, pageSize = 12) => async (dispatch) => {
    try {
        dispatch(fetchPopularStart());
        const data = await getPopularGames(page, pageSize);
        dispatch(fetchPopularSuccess(data.results));
    } catch (error) {
        dispatch(fetchPopularFailure(error.message));
    }
};

export const fetchTrendingGamesThunk = () => async (dispatch) => {
    try {
        dispatch(fetchTrendingStart());
        const data = await getTrendingGames();
        dispatch(fetchTrendingSuccess(data));
    } catch (error) {
        dispatch(fetchTrendingFailure(error.message));
    }
};

export const fetchCatalogGamesThunk = (filters = {}) => async (dispatch) => {
    try {
        dispatch(fetchCatalogStart());
        const data = await getGames(filters);
        dispatch(fetchCatalogSuccess(data));
    } catch (error) {
        dispatch(fetchCatalogFailure(error.message));
    }
};

export default gamesSlice.reducer;
