import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassGroups, addClassGroup, deleteClassGroup } from '../store/slices/classGroupSlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from '../components/CreateDialog';

const ClassGroupPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.classGroup);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchClassGroups());
    }, [dispatch]);

    const handleCreate = (data: any) => {
        dispatch(addClassGroup(data));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this class group?')) {
            dispatch(deleteClassGroup(id));
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Class Name', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id as string)} color="error">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    if (loading && items.length === 0) return <CircularProgress />;

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="body2" color="text.secondary">Manage student batches and sections</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} size="medium">Add Class</Button>
            </Box>
            <Paper elevation={0} sx={{ height: 'calc(100% - 80px)', width: '100%', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                <DataGrid rows={items} columns={columns} pageSizeOptions={[10]} disableRowSelectionOnClick sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc' } }} />
            </Paper>
            <CreateDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                title="Add New Class Group"
                fields={[
                    { name: 'name', label: 'Class Name', type: 'text', required: true },
                ]}
            />
        </Box>
    );
};

export default ClassGroupPage;
