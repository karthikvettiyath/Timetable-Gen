import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, addSubject, deleteSubject } from '../store/slices/subjectSlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from '../components/CreateDialog';

const SubjectPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.subject);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

    const handleCreate = (data: any) => {
        dispatch(addSubject(data));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this subject?')) {
            dispatch(deleteSubject(id));
        }
    };

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'contactHours', headerName: 'Hours', width: 100, type: 'number' },
        { field: 'requiresLab', headerName: 'Lab Req?', width: 120, type: 'boolean' },
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
                    <Typography variant="body2" color="text.secondary">Manage courses and their requirements</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} size="medium">Add Subject</Button>
            </Box>
            <Paper elevation={0} sx={{ height: 'calc(100% - 80px)', width: '100%', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
                <DataGrid rows={items} columns={columns} pageSizeOptions={[10]} disableRowSelectionOnClick sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc' } }} />
            </Paper>
            <CreateDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                title="Add New Subject"
                fields={[
                    { name: 'name', label: 'Name', type: 'text', required: true },
                    { name: 'code', label: 'Code', type: 'text', required: true },
                    { name: 'contactHours', label: 'Contact Hours', type: 'number', required: true },
                    { name: 'requiresLab', label: 'Requires Lab?', type: 'boolean' },
                ]}
            />
        </Box>
    );
};

export default SubjectPage;
