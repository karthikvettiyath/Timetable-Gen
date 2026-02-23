import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateTimetable, fetchTimetable } from '../store/slices/schedulerSlice';
import { fetchFaculties } from '../store/slices/facultySlice';
import { fetchRooms } from '../store/slices/roomSlice';
import { fetchSubjects } from '../store/slices/subjectSlice';
import { fetchClassGroups } from '../store/slices/classGroupSlice';
import type { RootState, AppDispatch } from '../store';
import {
    Button, Typography, Box, Card, CardContent, CircularProgress,
    Grid, Tabs, Tab, Alert
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GroupsIcon from '@mui/icons-material/Groups';
import BookIcon from '@mui/icons-material/Book';

import { motion } from 'framer-motion';
import TimetableGrid from '../components/TimetableGrid';

const StatCard: React.FC<{ title: string; count: number | string; icon: React.ReactNode; color: string; delay?: number }> = ({ title, count, icon, color, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Card sx={{
            height: '100%',
            transition: 'all 0.3s ease',
            borderRadius: '20px',
            boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.08)',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 20px 50px rgba(112, 144, 176, 0.2)'
            }
        }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{
                    p: 2.5,
                    borderRadius: '50%',
                    bgcolor: `${color}15`,
                    color: color,
                    mr: 2.5,
                    display: 'flex',
                    boxShadow: `0 4px 10px ${color}10`
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>{title}</Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ color: '#2B3674' }}>{count}</Typography>
                </Box>
            </CardContent>
        </Card>
    </motion.div>
);

const AdminDashboard: React.FC<any> = ({ faculty, room, classGroup, scheduler, handleGenerate }) => (
    <Box>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGenerate}
                    disabled={scheduler.loading}
                    startIcon={scheduler.loading ? <CircularProgress size={20} color="inherit" /> : <DashboardIcon />}
                    sx={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                        boxShadow: '0 10px 20px rgba(67, 24, 255, 0.2)',
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    {scheduler.loading ? 'Generating...' : 'Generate New Timetable'}
                </Button>
            </Box>
        </motion.div>

        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 1 }}>
                <StatCard title="Total Faculties" count={faculty.items.length} icon={<PeopleIcon />} color="#4318FF" delay={0.1} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 1 }}>
                <StatCard title="Total Rooms" count={room.items.length} icon={<MeetingRoomIcon />} color="#05CD99" delay={0.2} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 1 }}>
                <StatCard title="Class Groups" count={classGroup.items.length} icon={<GroupsIcon />} color="#FFB547" delay={0.3} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 1 }}>
                <StatCard title="Weekly Classes" count={scheduler.items.length} icon={<DashboardIcon />} color="#E31A1A" delay={0.4} />
            </Grid>
        </Grid>

        <TimetableTabsSection classGroups={classGroup.items} schedulerItems={scheduler.items} />
    </Box>
);

const TeacherDashboard: React.FC<any> = ({ user, scheduler, subjects, faculty }) => {
    // Find the faculty record for the current user
    const facultyRecord = faculty.items.find((f: any) => f.email === user.email);
    const teacherSchedule = scheduler.items.filter((s: any) => s.facultyId === facultyRecord?.id);
    const teacherSubjects = subjects.items.filter((s: any) =>
        facultyRecord?.subjects?.some((fs: any) => fs.id === s.id)
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#2B3674', fontWeight: 700, mb: 3 }}>
                Welcome back, Prof. {user.name}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
                    <StatCard title="My Subjects" count={teacherSubjects.length} icon={<BookIcon />} color="#4318FF" delay={0.1} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
                    <StatCard title="Classes Today" count={teacherSchedule.length > 0 ? '4' : '0'} icon={<DashboardIcon />} color="#05CD99" delay={0.2} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
                    <StatCard title="Weekly Hours" count={facultyRecord?.weeklyWorkload || 0} icon={<GroupsIcon />} color="#FFB547" delay={0.3} />
                </Grid>
            </Grid>

            {facultyRecord ? (
                <Card sx={{ borderRadius: 4, boxShadow: '0px 10px 30px rgba(112, 144, 176, 0.08)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ color: '#2B3674', fontWeight: 700, mb: 3 }}>My Schedule</Typography>
                        <TimetableGrid
                            schedule={scheduler.items}
                            filterType="faculty"
                            filterId={facultyRecord.id}
                        />
                    </CardContent>
                </Card>
            ) : (
                <Alert severity="info">No faculty record found for your account. Please contact Admin.</Alert>
            )}
        </Box>
    );
};

const UserDashboard: React.FC<any> = ({ scheduler, classGroup }) => {
    // In a real app, users (students) would be assigned to a class group
    // For demo, we'll just show the first class group
    const studentClassGroup = classGroup.items[0];

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#2B3674', fontWeight: 700, mb: 3 }}>
                Your Class Schedule: {studentClassGroup?.name || 'Loading...'}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ p: 1 }}>
                    <StatCard title="Active Subjects" count="6" icon={<BookIcon />} color="#4318FF" delay={0.1} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ p: 1 }}>
                    <StatCard title="Attendance" count="92%" icon={<GroupsIcon />} color="#05CD99" delay={0.2} />
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: 4, boxShadow: '0px 10px 30px rgba(112, 144, 176, 0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                    {studentClassGroup ? (
                        <TimetableGrid
                            schedule={scheduler.items}
                            filterType="classGroup"
                            filterId={studentClassGroup.id}
                        />
                    ) : (
                        <Typography>No class group assigned.</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

const TimetableTabsSection: React.FC<any> = ({ classGroups, schedulerItems }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Card sx={{ borderRadius: 4, boxShadow: '0px 10px 30px rgba(112, 144, 176, 0.08)', border: 'none' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1rem', minWidth: 100 },
                            '& .Mui-selected': { color: '#4318FF' },
                            '& .MuiTabs-indicator': { backgroundColor: '#4318FF', height: 3, borderRadius: 3 }
                        }}
                    >
                        {classGroups.map((group: any) => (
                            <Tab key={group.id} label={group.name} />
                        ))}
                    </Tabs>
                </Box>

                {classGroups.length > 0 ? (
                    <TimetableGrid
                        schedule={schedulerItems}
                        filterType="classGroup"
                        filterId={(classGroups[selectedTab] as any)?.id}
                    />
                ) : (
                    <Typography align="center" sx={{ py: 4 }} color="textSecondary">
                        No timetables available.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const scheduler = useSelector((state: RootState) => state.scheduler);
    const faculty = useSelector((state: RootState) => state.faculty);
    const room = useSelector((state: RootState) => state.room);
    const classGroup = useSelector((state: RootState) => state.classGroup);
    const subject = useSelector((state: RootState) => state.subject);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchTimetable());
        dispatch(fetchFaculties());
        dispatch(fetchRooms());
        dispatch(fetchSubjects());
        dispatch(fetchClassGroups());
    }, [dispatch]);

    const handleGenerate = () => {
        dispatch(generateTimetable()).then(() => dispatch(fetchTimetable()));
    };

    const isLoading = scheduler.loading || faculty.loading;

    if (isLoading && scheduler.items.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress size={40} sx={{ color: '#4318FF' }} />
            </Box>
        );
    }

    return (
        <Box>
            {user?.role === 'admin' && (
                <AdminDashboard
                    faculty={faculty}
                    room={room}
                    classGroup={classGroup}
                    scheduler={scheduler}
                    handleGenerate={handleGenerate}
                />
            )}
            {user?.role === 'teacher' && (
                <TeacherDashboard
                    user={user}
                    scheduler={scheduler}
                    subjects={subject}
                    faculty={faculty}
                />
            )}
            {user?.role === 'user' && (
                <UserDashboard
                    user={user}
                    scheduler={scheduler}
                    classGroup={classGroup}
                />
            )}
        </Box>
    );
};

export default Dashboard;
