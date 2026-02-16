import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/events';

const loadJoinedEvents = () => {
    try {
        const saved = localStorage.getItem('joinedEvents');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error cargando eventos guardados", e);
    }
    return [];
};

const initialState = {
    items: [],
    joined: loadJoinedEvents(),
    loading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEventsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchEventsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        joinEvent: (state, action) => {
            const eventId = action.payload;
            if (!state.joined.includes(eventId)) {
                state.joined.push(eventId);
                localStorage.setItem('joinedEvents', JSON.stringify(state.joined));
            }
        },
        leaveEvent: (state, action) => {
            const eventId = action.payload;
            state.joined = state.joined.filter(id => id !== eventId);
            localStorage.setItem('joinedEvents', JSON.stringify(state.joined));
        }
    },
});

export const {
    fetchEventsStart, fetchEventsSuccess, fetchEventsFailure,
    joinEvent, leaveEvent
} = eventsSlice.actions;

export const fetchEventsThunk = () => async (dispatch) => {
    try {
        dispatch(fetchEventsStart());
        const data = await fetchEvents();
        dispatch(fetchEventsSuccess(data));
    } catch (error) {
        dispatch(fetchEventsFailure(error.message));
    }
};

export default eventsSlice.reducer;
