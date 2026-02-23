import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roomApi } from '../../api';

// Room Thunks
export const fetchRooms = createAsyncThunk('room/fetchAll', async () => {
    const response = await roomApi.findAll();
    return response.data;
});

export const addRoom = createAsyncThunk('room/add', async (data: any) => {
    const response = await roomApi.create(data);
    return response.data;
});

export const deleteRoom = createAsyncThunk('room/delete', async (id: string) => {
    await roomApi.remove(id);
    return id;
});

const roomSlice = createSlice({
    name: 'room',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => { state.loading = true; })
            .addCase(fetchRooms.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchRooms.rejected, (state, action) => { state.loading = false; state.error = action.error.message as any; })
            .addCase(addRoom.fulfilled, (state, action) => { state.items.push(action.payload as never); })
            .addCase(deleteRoom.fulfilled, (state, action) => { state.items = state.items.filter((item: any) => item.id !== action.payload); });
    },
});
export default roomSlice.reducer;
