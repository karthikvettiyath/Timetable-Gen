import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subjectApi } from '../../api';

// Subject Thunks
export const fetchSubjects = createAsyncThunk('subject/fetchAll', async () => {
    const response = await subjectApi.findAll();
    return response.data;
});

export const addSubject = createAsyncThunk('subject/add', async (data: any) => {
    const response = await subjectApi.create(data);
    return response.data;
});

export const deleteSubject = createAsyncThunk('subject/delete', async (id: string) => {
    await subjectApi.remove(id);
    return id;
});

const subjectSlice = createSlice({
    name: 'subject',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => { state.loading = true; })
            .addCase(fetchSubjects.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchSubjects.rejected, (state, action) => { state.loading = false; state.error = action.error.message as any; })
            .addCase(addSubject.fulfilled, (state, action) => { state.items.push(action.payload as never); })
            .addCase(deleteSubject.fulfilled, (state, action) => { state.items = state.items.filter((item: any) => item.id !== action.payload); });
    },
});
export default subjectSlice.reducer;
