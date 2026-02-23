import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaculties, addFaculty, deleteFaculty } from '../store/slices/facultySlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, IconButton, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateDialog from '../components/CreateDialog';

import { fetchSubjects } from '../store/slices/subjectSlice';

const FacultyPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.faculty);
    const { items: subjects } = useSelector((state: RootState) => state.subject);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchFaculties());
        dispatch(fetchSubjects());
    }, [dispatch]);

    const handleCreate = (data: any) => {
        dispatch(addFaculty(data));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this faculty?')) {
            dispatch(deleteFaculty(id));
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'weeklyWorkload', headerName: 'Workload', width: 100, type: 'number' },
        {
            field: 'subjects',
            headerName: 'Subjects',
            width: 250,
            valueGetter: (value, row) => {
                const subjects = row?.subjects || value;
                if (Array.isArray(subjects)) {
                    return subjects.map((s: any) => s.name).join(', ');
                }
                return '';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id as string)} color="error">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    if (loading && items.length === 0) return <CircularProgress />;

    const subjectOptions = subjects.map((sub: any) => ({ value: sub.id, label: sub.name }));



    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#2B3674' }}>Faculty Management</Typography>
                        <Typography variant="body2" color="text.secondary">Manage your academic staff and their workloads</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        size="medium"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                            boxShadow: '0 10px 20px rgba(67, 24, 255, 0.2)'
                        }}
                    >
                        Add Faculty
                    </Button>
                </Box>
            </motion.div>

            <Paper elevation={0} sx={{
                height: 'calc(100% - 100px)',
                width: '100%',
                borderRadius: 4,
                border: 'none',
                boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.1)',
                overflow: 'hidden'
            }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeaders': { bgcolor: '#F4F7FE', color: '#B0BBD5', fontWeight: 700 },
                        '& .MuiDataGrid-cell': { borderBottom: '1px solid #F4F7FE' }
                    }}
                />
            </Paper>
            <CreateDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                title="Add New Faculty"
                fields={[
                    { name: 'name', label: 'Name', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'weeklyWorkload', label: 'Weekly Workload', type: 'number', required: true },
                    {
                        name: 'subjectIds',
                        label: 'Specialized Subjects',
                        type: 'multiselect',
                        options: subjectOptions
                    },
                    { name: 'unavailableSlots', label: 'Unavailable Slots (e.g., "Mon 9-10")', type: 'text' },
                ]}
            />
        </Box>
    );
};

export default FacultyPage;
