import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, Stack, useTheme, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';

const LandingPage: React.FC = () => {
    const theme = useTheme();

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <Box sx={{
            bgcolor: '#FFFFFF',
            minHeight: '100vh',
            overflowX: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
            {/* Background Decorative Elements */}
            <Box sx={{
                position: 'fixed',
                top: -100,
                right: -100,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(67, 24, 255, 0.05) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0
            }} />

            {/* Header / Nav */}
            <Container maxWidth="lg">
                <Box sx={{
                    py: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <SchoolIcon />
                        </Box>
                        <Typography variant="h5" sx={{ color: '#2B3674', fontWeight: 800, letterSpacing: '-0.5px' }}>
                            SMART<span style={{ color: '#4318FF' }}>GEN</span>
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Button
                            component={RouterLink}
                            to="/login"
                            sx={{
                                color: '#2B3674',
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem'
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="contained"
                            sx={{
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                                textTransform: 'none',
                                fontWeight: 700,
                                px: 3,
                                boxShadow: '0px 10px 20px rgba(67, 24, 255, 0.2)'
                            }}
                        >
                            Get Started
                        </Button>
                    </Stack>
                </Box>
            </Container>

            {/* Hero Section */}
            <Box sx={{ position: 'relative', pt: { xs: 6, md: 10 }, pb: 10 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Box sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '50px',
                                    bgcolor: 'rgba(67, 24, 255, 0.08)',
                                    color: '#4318FF',
                                    mb: 3,
                                    fontWeight: 700,
                                    fontSize: '0.85rem'
                                }}>
                                    <AutoAwesomeIcon sx={{ fontSize: 16, mr: 1 }} />
                                    AI-POWERED SCHEDULING SYSTEM
                                </Box>
                                <Typography variant="h1" sx={{
                                    fontWeight: 800,
                                    color: '#2B3674',
                                    mb: 3,
                                    fontSize: { xs: '2.8rem', md: '4.2rem' },
                                    lineHeight: 1.1,
                                    letterSpacing: '-2px'
                                }}>
                                    The Future of <br />
                                    <span style={{ color: '#4318FF' }}>Academic Planning</span>
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#707EAE', mb: 5, fontWeight: 500, maxWidth: '90%', lineHeight: 1.6 }}>
                                    Stop wasting weeks on manual scheduling. SmartGen uses advanced genetic algorithms to create conflict-free timetables in seconds.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            px: 5,
                                            py: 2.2,
                                            fontSize: '1.1rem',
                                            boxShadow: '0px 20px 40px rgba(67, 24, 255, 0.25)',
                                            '&:hover': {
                                                boxShadow: '0px 25px 50px rgba(67, 24, 255, 0.35)',
                                                transform: 'translateY(-2px)'
                                            },
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Create Your Timetable
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderRadius: '16px',
                                            borderColor: '#E0E5F2',
                                            color: '#2B3674',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            px: 4,
                                            py: 2.2,
                                            '&:hover': {
                                                borderColor: '#2B3674',
                                                bgcolor: 'transparent'
                                            }
                                        }}
                                    >
                                        View Demo
                                    </Button>
                                </Stack>

                                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={-1} sx={{ mr: 2 }}>
                                        {[1, 2, 3, 4].map(i => (
                                            <Box key={i} sx={{
                                                width: 40, height: 40, borderRadius: '50%', border: '3px solid white',
                                                bgcolor: '#E0E5F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" style={{ width: '100%' }} />
                                            </Box>
                                        ))}
                                    </Stack>
                                    <Typography sx={{ color: '#707EAE', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Trusted by <span style={{ color: '#2B3674', fontWeight: 800 }}>500+</span> Educational Institutions
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        inset: -20,
                                        bgcolor: '#F4F7FE',
                                        borderRadius: '40px',
                                        zIndex: 0,
                                        transform: 'rotate(-3deg)'
                                    }} />
                                    <Card sx={{
                                        borderRadius: '32px',
                                        overflow: 'hidden',
                                        boxShadow: '0px 40px 80px rgba(0,0,0,0.1)',
                                        position: 'relative',
                                        zIndex: 1,
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}>
                                        <Box
                                            component="img"
                                            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
                                            sx={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            bottom: 20,
                                            right: 20,
                                            bgcolor: 'white',
                                            p: 2,
                                            borderRadius: '16px',
                                            boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
                                            maxWidth: 200
                                        }}>
                                            <Typography variant="caption" sx={{ color: '#707EAE', display: 'block', mb: 0.5 }}>Processing State</Typography>
                                            <Box sx={{ width: '100%', height: 6, bgcolor: '#F4F7FE', borderRadius: '10px', overflow: 'hidden', mb: 1 }}>
                                                <Box sx={{ width: '85%', height: '100%', bgcolor: '#05CD99' }} />
                                            </Box>
                                            <Typography variant="body2" sx={{ color: '#2B3674', fontWeight: 800 }}>85% Conflicts Resolved</Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 8, bgcolor: '#F4F7FE' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {[
                            { label: 'Time Saved', value: '98%', color: '#4318FF' },
                            { label: 'Conflicts Resolved', value: '0.0%', color: '#05CD99' },
                            { label: 'Institutions', value: '500+', color: '#2B3674' },
                            { label: 'Uptime', value: '99.9%', color: '#FFB547' }
                        ].map((stat, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 0.5 }}>{stat.value}</Typography>
                                    <Typography variant="body2" sx={{ color: '#707EAE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features Grid */}
            <Container maxWidth="lg" sx={{ py: 12 }}>
                <Box textAlign="center" mb={10}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#2B3674', mb: 2, letterSpacing: '-1px' }}>
                        Engineered for Excellence
                    </Typography>
                    <Typography sx={{ color: '#707EAE', fontSize: '1.2rem', maxWidth: 600, mx: 'auto' }}>
                        Powerful tools designed to simplify the most complex academic scheduling challenges.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        { title: 'Genetic Algorithm', icon: <AutoAwesomeIcon />, desc: 'Biologically inspired optimization that evolves the best schedule over generations.', color: '#4318FF' },
                        { title: 'Role Management', icon: <GroupIcon />, desc: 'Granular permissions for Administrators, Teachers, and Department Heads.', color: '#05CD99' },
                        { title: 'Conflict Detection', icon: <SpeedIcon />, desc: 'Instant feedback on room clashes, teacher overlaps, and student availability.', color: '#FFB547' },
                        { title: 'Modern Visuals', icon: <CalendarMonthIcon />, desc: 'Beautifully rendered timetables exportable to PDF, Excel, and Google Calendar.', color: '#E31A1A' }
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card sx={{
                                    borderRadius: '28px',
                                    height: '100%',
                                    boxShadow: '0px 20px 50px rgba(112, 144, 176, 0.08)',
                                    border: '1px solid transparent',
                                    background: '#FFFFFF',
                                    transition: '0.4s',
                                    '&:hover': {
                                        transform: 'translateY(-12px)',
                                        boxShadow: '0px 30px 60px rgba(112, 144, 176, 0.15)',
                                        borderColor: `${feature.color}30`,
                                        '& .icon-box': {
                                            transform: 'scale(1.1) rotate(5deg)',
                                            boxShadow: `0px 10px 20px ${feature.color}30`
                                        }
                                    }
                                }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box className="icon-box" sx={{
                                            display: 'inline-flex',
                                            p: 2,
                                            borderRadius: '20px',
                                            bgcolor: `${feature.color}10`,
                                            color: feature.color,
                                            mb: 4,
                                            transition: '0.4s'
                                        }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#2B3674', mb: 2 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography sx={{ color: '#707EAE', fontSize: '1rem', lineHeight: 1.7 }}>
                                            {feature.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Container maxWidth="lg" sx={{ pb: 12 }}>
                <Box sx={{
                    p: { xs: 5, md: 8 },
                    borderRadius: '40px',
                    background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0px 40px 80px rgba(67, 24, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Box sx={{ opacity: 0.1, position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', border: '60px solid white' }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, position: 'relative', zIndex: 1 }}>Ready to Automate Your Schedule?</Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 5, maxWidth: 600, mx: 'auto', fontWeight: 400, position: 'relative', zIndex: 1 }}>
                        Join hundreds of forward-thinking institutions that have already transformed their planning process.
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'white',
                            color: '#4318FF',
                            borderRadius: '16px',
                            fontWeight: 800,
                            px: 6,
                            py: 2.2,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#F4F7FE',
                                transform: 'scale(1.05)'
                            },
                            transition: '0.2s',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        Start Your Free Trial
                    </Button>
                </Box>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 8, borderTop: '1px solid #F4F7FE' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                <Box sx={{
                                    width: 32, height: 32, borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                }}>
                                    <SchoolIcon sx={{ fontSize: 18 }} />
                                </Box>
                                <Typography variant="h6" sx={{ color: '#2B3674', fontWeight: 800 }}>
                                    SMART<span style={{ color: '#4318FF' }}>GEN</span>
                                </Typography>
                            </Stack>
                            <Typography sx={{ color: '#707EAE', fontSize: '0.9rem' }}>
                                Empowering educational institutions through intelligent automation and elegant design.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={4} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                                <Typography sx={{ color: '#707EAE', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#4318FF' } }}>Product</Typography>
                                <Typography sx={{ color: '#707EAE', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#4318FF' } }}>Pricing</Typography>
                                <Typography sx={{ color: '#707EAE', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#4318FF' } }}>Docs</Typography>
                                <Typography sx={{ color: '#707EAE', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#4318FF' } }}>Contact</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 4, opacity: 0.5 }} />
                    <Typography sx={{ color: '#707EAE', textAlign: 'center', fontWeight: 500, fontSize: '0.85rem' }}>
                        © 2026 SmartGen. Built with Passion for Education.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
