import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateTimetable, fetchTimetable } from '../store/slices/schedulerSlice';
import { fetchFaculties } from '../store/slices/facultySlice';
import { fetchRooms } from '../store/slices/roomSlice';
import { fetchClassGroups } from '../store/slices/classGroupSlice';
import type { RootState, AppDispatch } from '../store';
import { Button, Typography, Box, CircularProgress, Card, CardContent, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TimetableGrid from '../components/TimetableGrid';
import { motion } from 'framer-motion';

const TimetablePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const scheduler = useSelector((state: RootState) => state.scheduler);
    const faculty = useSelector((state: RootState) => state.faculty);
    const room = useSelector((state: RootState) => state.room);
    const classGroup = useSelector((state: RootState) => state.classGroup);

    const [viewMode, setViewMode] = useState<'classGroup' | 'faculty' | 'room'>('classGroup');
    const [selectedId, setSelectedId] = useState<string>('');

    useEffect(() => {
        dispatch(fetchTimetable());
        dispatch(fetchFaculties());
        dispatch(fetchRooms());
        dispatch(fetchClassGroups());
    }, [dispatch]);

    // Set default selectedId when data loads or viewMode changes
    useEffect(() => {
        if (viewMode === 'classGroup' && classGroup.items.length > 0 && !selectedId) {
            setSelectedId((classGroup.items[0] as any).id);
        } else if (viewMode === 'faculty' && faculty.items.length > 0 && !selectedId) {
            setSelectedId((faculty.items[0] as any).id);
        } else if (viewMode === 'room' && room.items.length > 0 && !selectedId) {
            setSelectedId((room.items[0] as any).id);
        }
    }, [viewMode, classGroup.items, faculty.items, room.items, selectedId]);

    const handleGenerate = async () => {
        if (window.confirm('This will overwrite the existing timetable. Continue?')) {
            await dispatch(generateTimetable());
            dispatch(fetchTimetable());
        }
    };

    const handleViewModeChange = (_: React.SyntheticEvent, newValue: 'classGroup' | 'faculty' | 'room') => {
        setViewMode(newValue);
        setSelectedId(''); // Reset selection
    };

    const handleSelectionChange = (event: SelectChangeEvent) => {
        setSelectedId(event.target.value as string);
    };

    const getItems = () => {
        switch (viewMode) {
            case 'classGroup': return classGroup.items;
            case 'faculty': return faculty.items;
            case 'room': return room.items;
            default: return [];
        }
    };

    const isLoading = scheduler.loading || faculty.loading || room.loading || classGroup.loading;

    return (
        <Box sx={{ width: '100%', pb: 4 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#2B3674' }}>Timetable Views</Typography>
                        <Typography variant="body2" color="text.secondary">View schedule by Class, Faculty, or Room</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={() => dispatch(fetchTimetable())}
                            variant="outlined"
                            disabled={isLoading}
                            sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}
                        >
                            Refresh
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                            onClick={handleGenerate}
                            disabled={isLoading}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                                boxShadow: '0 10px 20px rgba(67, 24, 255, 0.2)'
                            }}
                        >
                            {isLoading ? 'System Generate' : 'Generate System'}
                        </Button>
                    </Box>
                </Box>
            </motion.div>

            {/* View Switching Tabs */}
            <Card sx={{ mb: 3, borderRadius: 4, boxShadow: '0px 10px 30px rgba(112, 144, 176, 0.08)', border: 'none', overflow: 'visible' }}>
                <CardContent sx={{ p: '10px 24px' }}>
                    <Tabs
                        value={viewMode}
                        onChange={handleViewModeChange}
                        variant="standard"
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: '#4318FF', height: 4, borderRadius: 2 },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                minHeight: 60,
                                px: 4,
                                color: '#A3AED0',
                                '&.Mui-selected': { color: '#4318FF' }
                            }
                        }}
                    >
                        <Tab icon={<GroupsIcon />} iconPosition="start" value="classGroup" label="Class Groups" />
                        <Tab icon={<PeopleIcon />} iconPosition="start" value="faculty" label="Faculty" />
                        <Tab icon={<MeetingRoomIcon />} iconPosition="start" value="room" label="Rooms" />
                    </Tabs>
                </CardContent>
            </Card>

            {/* Selection Dropdown */}
            <Box sx={{ mb: 3, maxWidth: 400 }}>
                <FormControl fullWidth size="small" sx={{
                    bgcolor: 'white',
                    borderRadius: 3,
                    '& .MuiOutlinedInput-root': { borderRadius: 3, '& fieldset': { borderColor: 'transparent' }, '&.Mui-focused fieldset': { borderColor: '#4318FF' } },
                    boxShadow: '0px 8px 20px rgba(112, 144, 176, 0.08)'
                }}>
                    <InputLabel id="select-entity-label" sx={{ fontWeight: 500 }}>Select {viewMode === 'classGroup' ? 'Class Group' : (viewMode === 'faculty' ? 'Faculty' : 'Room')}</InputLabel>
                    <Select
                        labelId="select-entity-label"
                        value={selectedId}
                        label={`Select ${viewMode}`}
                        onChange={handleSelectionChange}
                    >
                        {getItems().map((item: any) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Error Message */}
            {scheduler.error && (
                <Card sx={{ mb: 2, bgcolor: '#fff4f4', border: '1px solid #ffcccc', borderRadius: 3 }}>
                    <CardContent>
                        <Typography color="error">Error: {scheduler.error}</Typography>
                    </CardContent>
                </Card>
            )}

            {/* Grid */}
            <Card sx={{ borderRadius: 4, boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.1)', border: 'none', minHeight: 400 }}>
                <CardContent sx={{ p: 0 }}>
                    {scheduler.items.length === 0 && !isLoading ? (
                        <Box sx={{ p: 8, textAlign: 'center' }}>
                            <AutoAwesomeIcon sx={{ fontSize: 60, color: '#E0E5F2', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" fontWeight={600}>No timetable generated</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Click "Generate System" to create a new schedule.
                            </Typography>
                        </Box>
                    ) : (
                        selectedId ? (
                            <TimetableGrid
                                schedule={scheduler.items}
                                filterType={viewMode}
                                filterId={selectedId}
                            />
                        ) : (
                            <Box sx={{ p: 4, textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        )
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default TimetablePage;
