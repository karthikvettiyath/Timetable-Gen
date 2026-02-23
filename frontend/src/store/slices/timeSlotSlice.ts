import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { timeSlotApi } from '../../api';

// TimeSlot Thunks
export const fetchTimeSlots = createAsyncThunk('timeSlot/fetchAll', async () => {
    const response = await timeSlotApi.findAll();
    return response.data;
});

export const addTimeSlot = createAsyncThunk('timeSlot/add', async (data: any) => {
    const response = await timeSlotApi.create(data);
    return response.data;
});

export const deleteTimeSlot = createAsyncThunk('timeSlot/delete', async (id: string) => {
    await timeSlotApi.remove(id);
    return id;
});

const timeSlotSlice = createSlice({
    name: 'timeSlot',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeSlots.pending, (state) => { state.loading = true; })
            .addCase(fetchTimeSlots.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchTimeSlots.rejected, (state, action) => { state.loading = false; state.error = action.error.message as any; })
            .addCase(addTimeSlot.fulfilled, (state, action) => { state.items.push(action.payload as never); })
            .addCase(deleteTimeSlot.fulfilled, (state, action) => { state.items = state.items.filter((item: any) => item.id !== action.payload); });
    },
});
export default timeSlotSlice.reducer;
