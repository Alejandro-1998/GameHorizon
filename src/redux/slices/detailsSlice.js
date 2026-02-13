import { createSlice } from '@reduxjs/toolkit';
import { getGameDetails, getPublisherDetails, getGameScreenshots } from '../../services/api';

const initialState = {
    game: {
        data: null,
        loading: false,
        error: null,
    },
    publisher: {
        data: null,
        loading: false,
        error: null,
    },
    screenshots: {
        items: [],
        loading: false,
        error: null,
    }
};

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        // Game Details
        fetchGameDetailsStart: (state) => {
            state.game.loading = true;
            state.game.error = null;
        },
        fetchGameDetailsSuccess: (state, action) => {
            state.game.loading = false;
            state.game.data = action.payload;
        },
        fetchGameDetailsFailure: (state, action) => {
            state.game.loading = false;
            state.game.error = action.payload;
        },

        // Publisher Details
        fetchPublisherDetailsStart: (state) => {
            state.publisher.loading = true;
            state.publisher.error = null;
        },
        fetchPublisherDetailsSuccess: (state, action) => {
            state.publisher.loading = false;
            state.publisher.data = action.payload;
        },
        fetchPublisherDetailsFailure: (state, action) => {
            state.publisher.loading = false;
            state.publisher.error = action.payload;
        },

        // Screenshots
        fetchScreenshotsStart: (state) => {
            state.screenshots.loading = true;
            state.screenshots.error = null;
        },
        fetchScreenshotsSuccess: (state, action) => {
            state.screenshots.loading = false;
            state.screenshots.items = action.payload;
        },
        fetchScreenshotsFailure: (state, action) => {
            state.screenshots.loading = false;
            state.screenshots.error = action.payload;
        }
    },
});

export const {
    fetchGameDetailsStart, fetchGameDetailsSuccess, fetchGameDetailsFailure,
    fetchPublisherDetailsStart, fetchPublisherDetailsSuccess, fetchPublisherDetailsFailure,
    fetchScreenshotsStart, fetchScreenshotsSuccess, fetchScreenshotsFailure
} = detailsSlice.actions;

// Thunks Clásicos

export const fetchGameDetailsThunk = (id) => async (dispatch) => {
    try {
        dispatch(fetchGameDetailsStart());
        const data = await getGameDetails(id);
        dispatch(fetchGameDetailsSuccess(data));
    } catch (error) {
        dispatch(fetchGameDetailsFailure(error.message));
    }
};

export const fetchPublisherDetailsThunk = (id) => async (dispatch) => {
    try {
        dispatch(fetchPublisherDetailsStart());
        const data = await getPublisherDetails(id);
        dispatch(fetchPublisherDetailsSuccess(data));
    } catch (error) {
        dispatch(fetchPublisherDetailsFailure(error.message));
    }
};

export const fetchScreenshotsThunk = (id) => async (dispatch) => {
    try {
        dispatch(fetchScreenshotsStart());
        const data = await getGameScreenshots(id);
        dispatch(fetchScreenshotsSuccess(data));
    } catch (error) {
        dispatch(fetchScreenshotsFailure(error.message));
    }
};

export default detailsSlice.reducer;
