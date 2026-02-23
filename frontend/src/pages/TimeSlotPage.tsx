import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots, addTimeSlot, deleteTimeSlot } from '../store/slices/timeSlotSlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from '../components/CreateDialog';

const TimeSlotPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.timeSlot);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTimeSlots());
    }, [dispatch]);

    const handleCreate = (data: any) => {
        dispatch(addTimeSlot(data));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this slot?')) {
            dispatch(deleteTimeSlot(id));
        }
    };

    const columns: GridColDef[] = [
        { field: 'dayOfWeek', headerName: 'Day (1=Mon)', width: 150, type: 'number' },
        { field: 'startTime', headerName: 'Start Time', width: 150 },
        { field: 'endTime', headerName: 'End Time', width: 150 },
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
                    <Typography variant="body2" color="text.secondary">Define available teaching periods</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} size="medium">Add Slot</Button>
            </Box>
            <Paper elevation={0} sx={{ height: 'calc(100% - 80px)', width: '100%', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                <DataGrid rows={items} columns={columns} pageSizeOptions={[10]} disableRowSelectionOnClick sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc' } }} />
            </Paper>
            <CreateDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                title="Add New Time Slot"
                fields={[
                    { name: 'dayOfWeek', label: 'Day (1=Mon, 5=Fri)', type: 'number', required: true },
                    { name: 'startTime', label: 'Start Time (HH:MM)', type: 'text', required: true },
                    { name: 'endTime', label: 'End Time (HH:MM)', type: 'text', required: true },
                ]}
            />
        </Box>
    );
};

export default TimeSlotPage;
