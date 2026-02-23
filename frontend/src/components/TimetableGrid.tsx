import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface TimetableGridProps {
    schedule: any[];
    filterId: string; // The ID to filter by (e.g., classGroupId, facultyId, roomId)
    filterType: 'classGroup' | 'faculty' | 'room';
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ schedule, filterId, filterType }) => {
    // Filter entries based on the type
    const entries = schedule.filter(e => {
        if (filterType === 'classGroup') return e.classGroupId === filterId;
        if (filterType === 'faculty') return e.facultyId === filterId;
        if (filterType === 'room') return e.roomId === filterId;
        return false;
    });

    const days = [1, 2, 3, 4, 5]; // Mon-Fri
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    // Sort times
    const times = Array.from(new Set(schedule.map(e => e.timeslot.startTime))).sort();

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: 'none', borderRadius: 4, overflow: 'hidden', boxShadow: '0px 10px 30px rgba(112, 144, 176, 0.08)' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#F4F7FE' }}>
                        <TableCell sx={{ color: '#A3AED0', fontWeight: 800, borderBottom: 'none', py: 2 }}>Time / Day</TableCell>
                        {dayNames.map(day => (
                            <TableCell key={day} align="center" sx={{ color: '#A3AED0', fontWeight: 800, borderBottom: 'none', py: 2 }}>
                                {day}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {times.length > 0 ? (
                        times.map((time) => (
                            <TableRow key={time} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" sx={{ color: '#2B3674', fontWeight: 700, borderBottom: '1px solid #F4F7FE', whiteSpace: 'nowrap' }}>
                                    {time}
                                </TableCell>
                                {days.map((day, idx) => {
                                    const entry = entries.find(e => e.timeslot.dayOfWeek === day && e.timeslot.startTime === time);
                                    return (
                                        <TableCell key={day} align="center" sx={{ borderBottom: '1px solid #F4F7FE', p: 1, height: 100, verticalAlign: 'top' }}>
                                            {entry ? (
                                                <motion.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={itemVariants}
                                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                >
                                                    <Box sx={{
                                                        bgcolor: filterType === 'classGroup' ? '#4318FF' : (filterType === 'faculty' ? '#05CD99' : '#FFB547'),
                                                        color: 'white',
                                                        p: 1.5,
                                                        borderRadius: 3,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                        textAlign: 'left',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s',
                                                        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 15px rgba(0,0,0,0.15)' }
                                                    }}>
                                                        <Typography variant="body2" fontWeight="bold" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                                                            {filterType === 'classGroup' ? entry.subject.name :
                                                                filterType === 'faculty' ? entry.classGroup?.name :
                                                                    entry.classGroup?.name
                                                            }
                                                        </Typography>

                                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                            {filterType !== 'faculty' && (
                                                                <Box component="span" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.7rem' }}>
                                                                    {entry.faculty.name}
                                                                </Box>
                                                            )}
                                                            {filterType !== 'room' && (
                                                                <Box component="span" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.7rem' }}>
                                                                    {entry.room.name}
                                                                </Box>
                                                            )}
                                                            {filterType !== 'classGroup' && (
                                                                <Box component="span" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.7rem' }}>
                                                                    {entry.subject.name}
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </motion.div>
                                            ) : (
                                                null
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                <Typography variant="h6" color="text.secondary">No time slots configured.</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TimetableGrid;
