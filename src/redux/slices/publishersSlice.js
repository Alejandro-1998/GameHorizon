import { createSlice } from '@reduxjs/toolkit';
import { getPublishers } from '../../services/api';

const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: null,
};

const publishersSlice = createSlice({
    name: 'publishers',
    initialState,
    reducers: {
        fetchPublishersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPublishersSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload.results;
            state.count = action.payload.count;
        },
        fetchPublishersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    fetchPublishersStart, fetchPublishersSuccess, fetchPublishersFailure
} = publishersSlice.actions;

// Thunk Clásico

export const fetchPublishersThunk = (search = '', page = 1, pageSize = 24) => async (dispatch) => {
    try {
        dispatch(fetchPublishersStart());
        const data = await getPublishers(search, page, pageSize);
        dispatch(fetchPublishersSuccess(data));
    } catch (error) {
        dispatch(fetchPublishersFailure(error.message));
    }
};

export default publishersSlice.reducer;
