import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { schedulerApi } from '../../api';

export const generateTimetable = createAsyncThunk('scheduler/generate', async () => {
    const response = await schedulerApi.generate();
    return response.data;
});

export const fetchTimetable = createAsyncThunk('scheduler/fetchAll', async () => {
    const response = await schedulerApi.findAll();
    return response.data;
});

const schedulerSlice = createSlice({
    name: 'scheduler',
    initialState: {
        items: [],
        generatedCount: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generateTimetable.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateTimetable.fulfilled, (state, action) => {
                state.loading = false;
                state.generatedCount = action.payload.count;
            })
            .addCase(generateTimetable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            })
            .addCase(fetchTimetable.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimetable.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTimetable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            });
    },
});

export default schedulerSlice.reducer;
