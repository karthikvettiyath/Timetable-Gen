import React from 'react';
import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, CssBaseline, Avatar, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BookIcon from '@mui/icons-material/Book';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 260;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const menuItems = React.useMemo(() => {
        const allItems = [
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['admin', 'teacher', 'user'] },
            { text: 'Faculties', icon: <PeopleIcon />, path: '/faculties', roles: ['admin'] },
            { text: 'Rooms', icon: <MeetingRoomIcon />, path: '/rooms', roles: ['admin'] },
            { text: 'Subjects', icon: <BookIcon />, path: '/subjects', roles: ['admin'] },
            { text: 'Class Groups', icon: <GroupsIcon />, path: '/class-groups', roles: ['admin'] },
            { text: 'Time Slots', icon: <AccessTimeIcon />, path: '/time-slots', roles: ['admin'] },
            { text: 'Timetable', icon: <CalendarMonthIcon />, path: '/timetable', roles: ['admin', 'teacher', 'user'] },
        ];

        return allItems.filter(item => user && item.roles.includes(user.role));
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/landing');
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'rgba(244, 247, 254, 0.9)',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 700, color: '#2B3674' }}>
                            {menuItems.find(item => item.path === location.pathname)?.text || 'SmartSchedule'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: 2,
                            bgcolor: 'white', p: '6px 12px', borderRadius: 30,
                            boxShadow: '0px 10px 20px rgba(112, 144, 176, 0.05)',
                            transition: '0.3s',
                            '&:hover': {
                                boxShadow: '0px 15px 30px rgba(112, 144, 176, 0.1)',
                                transform: 'translateY(-1px)'
                            }
                        }}>
                            <Avatar sx={{ bgcolor: '#4318FF', width: 36, height: 36, fontSize: '0.85rem', fontWeight: 'bold' }}>
                                {user?.name?.substring(0, 2).toUpperCase() || 'US'}
                            </Avatar>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2B3674' }}>{user?.name || 'User'}</Typography>
                                <Typography variant="caption" sx={{ color: '#A3AED0', textTransform: 'capitalize' }}>{user?.role}</Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={handleLogout} sx={{ color: '#E31A1A' }}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        bgcolor: '#ffffff',
                        boxShadow: '4px 0px 30px rgba(112, 144, 176, 0.05)'
                    },
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: 4, mb: 1 }}>
                    <Typography variant="h4" sx={{ color: '#2B3674', fontWeight: 800, letterSpacing: '0.5px' }}>
                        SMART<span style={{ color: '#4318FF' }}>GEN</span>
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto', px: 2 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                    sx={{
                                        borderRadius: '12px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&.Mui-selected': {
                                            bgcolor: '#4318FF',
                                            color: '#ffffff',
                                            boxShadow: '0px 10px 20px rgba(67, 24, 255, 0.2)',
                                            '&:hover': { bgcolor: '#2B00D4' },
                                            '&::after': { display: 'none' }
                                        },
                                        '&:hover': {
                                            bgcolor: location.pathname === item.path ? '#2B00D4' : 'rgba(244, 247, 254, 0.7)'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        color: location.pathname === item.path ? '#ffffff' : '#A3AED0',
                                        minWidth: 40
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: location.pathname === item.path ? 700 : 500,
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0, mt: 10, maxWidth: '100%', overflowX: 'hidden' }}>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                >
                    {children}
                </motion.div>
            </Box>
        </Box>
    );
};

export default Layout;
