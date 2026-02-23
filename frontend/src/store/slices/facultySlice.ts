import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { facultyApi } from '../../api';

// Faculty Thunks
export const fetchFaculties = createAsyncThunk('faculty/fetchAll', async () => {
    const response = await facultyApi.findAll();
    return response.data;
});

export const addFaculty = createAsyncThunk('faculty/add', async (data: any) => {
    const response = await facultyApi.create(data);
    return response.data;
});

export const deleteFaculty = createAsyncThunk('faculty/delete', async (id: string) => {
    await facultyApi.remove(id);
    return id;
});

const facultySlice = createSlice({
    name: 'faculty',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaculties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFaculties.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFaculties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            })
            // Add Faculty
            .addCase(addFaculty.fulfilled, (state, action) => {
                state.items.push(action.payload as never);
            })
            // Delete Faculty
            .addCase(deleteFaculty.fulfilled, (state, action) => {
                state.items = state.items.filter((item: any) => item.id !== action.payload);
            });
    },
});

export default facultySlice.reducer;
