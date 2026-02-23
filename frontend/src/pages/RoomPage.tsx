import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, addRoom, deleteRoom } from '../store/slices/roomSlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from '../components/CreateDialog';

const RoomPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.room);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const handleCreate = (data: any) => {
        dispatch(addRoom(data));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this room?')) {
            dispatch(deleteRoom(id));
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'capacity', headerName: 'Capacity', width: 150, type: 'number' },
        { field: 'isLab', headerName: 'Lab?', width: 100, type: 'boolean' },
        { field: 'hasProjector', headerName: 'Projector?', width: 100, type: 'boolean' },
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
                    <Typography variant="body2" color="text.secondary">Manage classrooms, labs, and their capacities</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} size="medium">Add Room</Button>
            </Box>
            <Paper elevation={0} sx={{ height: 'calc(100% - 80px)', width: '100%', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                <DataGrid rows={items} columns={columns} pageSizeOptions={[10]} disableRowSelectionOnClick sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc' } }} />
            </Paper>
            <CreateDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                title="Add New Room"
                fields={[
                    { name: 'name', label: 'Name', type: 'text', required: true },
                    { name: 'capacity', label: 'Capacity', type: 'number', required: true },
                    { name: 'isLab', label: 'Is Lab?', type: 'boolean' },
                    { name: 'hasProjector', label: 'Has Projector?', type: 'boolean' },
                ]}
            />
        </Box>
    );
};

export default RoomPage;
