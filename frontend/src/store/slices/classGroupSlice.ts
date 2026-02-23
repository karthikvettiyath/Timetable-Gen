import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { classGroupApi } from '../../api';

// ClassGroup Thunks
export const fetchClassGroups = createAsyncThunk('classGroup/fetchAll', async () => {
    const response = await classGroupApi.findAll();
    return response.data;
});

export const addClassGroup = createAsyncThunk('classGroup/add', async (data: any) => {
    const response = await classGroupApi.create(data);
    return response.data;
});

export const deleteClassGroup = createAsyncThunk('classGroup/delete', async (id: string) => {
    await classGroupApi.remove(id);
    return id;
});

const classGroupSlice = createSlice({
    name: 'classGroup',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassGroups.pending, (state) => { state.loading = true; })
            .addCase(fetchClassGroups.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchClassGroups.rejected, (state, action) => { state.loading = false; state.error = action.error.message as any; })
            .addCase(addClassGroup.fulfilled, (state, action) => { state.items.push(action.payload as never); })
            .addCase(deleteClassGroup.fulfilled, (state, action) => { state.items = state.items.filter((item: any) => item.id !== action.payload); });
    },
});
export default classGroupSlice.reducer;
