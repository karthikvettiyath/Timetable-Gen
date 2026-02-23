import React, { useState } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, Button,
    InputAdornment, IconButton, Tab, Tabs, Divider, Alert,
    Stack, Link
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    School as SchoolIcon,
    AdminPanelSettings as AdminIcon,
    Person as StudentIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '../store/slices/authSlice';
import { supabase } from '../supabase';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [roleTab, setRoleTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roles = ['user', 'teacher', 'admin'] as const;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        setIsSubmitting(true);
        dispatch(setLoading(true));

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                if (data.user) {
                    const profile = {
                        id: data.user.id,
                        email: data.user.email!,
                        role: roles[roleTab],
                        name: data.user.email?.split('@')[0] || 'User'
                    };
                    dispatch(setUser(profile));
                    navigate('/');
                }
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            role: roles[roleTab]
                        }
                    }
                });

                if (error) throw error;

                if (data.user) {
                    setLocalError('Success! Please check your email for verification.');
                    setIsLogin(true);
                }
            }
        } catch (err: any) {
            setLocalError(err.message || 'Authentication failed');
            dispatch(setError(err.message || 'Authentication failed'));
        } finally {
            setIsSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    // For demo purposes: bypass login
    const handleDemoLogin = (roleIndex: number) => {
        const role = roles[roleIndex];
        const profile = {
            id: `demo-${role}`,
            email: `${role}@example.com`,
            role: role as any,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`
        };
        dispatch(setUser(profile));
        navigate('/');
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top left, #4318FF 0%, #F4F7FE 40%)',
            p: 2
        }}>
            <Box sx={{ width: '100%', maxWidth: 450 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        component={RouterLink}
                        to="/landing"
                        variant="h3"
                        sx={{
                            color: '#2B3674',
                            fontWeight: 800,
                            mb: 1,
                            textDecoration: 'none',
                            display: 'block'
                        }}
                    >
                        SMART<span style={{ color: '#4318FF' }}>GEN</span>
                    </Typography>
                    <Typography sx={{ color: '#A3AED0', fontWeight: 500 }}>
                        {isLogin ? 'Welcome back! Please enter your details' : 'Create an account to get started'}
                    </Typography>
                </Box>

                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card sx={{
                        borderRadius: '24px',
                        boxShadow: '0px 20px 50px rgba(112, 144, 176, 0.12)',
                        overflow: 'visible'
                    }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ mb: 4 }}>
                                <Tabs
                                    value={roleTab}
                                    onChange={(_, v) => setRoleTab(v)}
                                    variant="fullWidth"
                                    sx={{
                                        minHeight: 48,
                                        bgcolor: '#F4F7FE',
                                        borderRadius: '12px',
                                        p: 0.5,
                                        '& .MuiTabs-indicator': {
                                            bgcolor: 'white',
                                            height: 'calc(100% - 8px)',
                                            borderRadius: '10px',
                                            bottom: 4,
                                            boxShadow: '0px 4px 12px rgba(0,0,0,0.05)'
                                        },
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: '#A3AED0',
                                            minHeight: 40,
                                            zIndex: 1,
                                            transition: '0.2s'
                                        },
                                        '& .Mui-selected': { color: '#4318FF !important' }
                                    }}
                                >
                                    <Tab icon={<StudentIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="User" />
                                    <Tab icon={<SchoolIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Teacher" />
                                    <Tab icon={<AdminIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Admin" />
                                </Tabs>
                            </Box>

                            {localError && (
                                <Alert
                                    severity={localError.includes('Success') ? "success" : "error"}
                                    sx={{ mb: 3, borderRadius: '12px' }}
                                >
                                    {localError}
                                </Alert>
                            )}

                            <form onSubmit={handleAuth}>
                                <Stack spacing={2.5}>
                                    {!isLogin && (
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonAddIcon sx={{ color: '#A3AED0' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { borderRadius: '16px', bgcolor: '#F4F7FE', border: 'none' }
                                            }}
                                        />
                                    )}
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        placeholder="mail@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon sx={{ color: '#A3AED0' }} />
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: '16px', bgcolor: '#F4F7FE' }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: '#A3AED0' }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: '16px', bgcolor: '#F4F7FE' }
                                        }}
                                    />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{
                                            py: 1.8,
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #4318FF 0%, #2B00D4 100%)',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            boxShadow: '0px 10px 20px rgba(67, 24, 255, 0.25)',
                                            mt: 1,
                                            '&:hover': {
                                                boxShadow: '0px 15px 30px rgba(67, 24, 255, 0.35)',
                                            }
                                        }}
                                    >
                                        {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                                    </Button>
                                </Stack>
                            </form>

                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#A3AED0', fontWeight: 500 }}>
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <Link
                                        component="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        sx={{
                                            ml: 1,
                                            color: '#4318FF',
                                            fontWeight: 700,
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </Link>
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Divider sx={{ mb: 3 }}>
                                    <Typography variant="caption" sx={{ color: '#A3AED0', px: 1, fontWeight: 700 }}>
                                        QUICK DEMO ACCESS
                                    </Typography>
                                </Divider>

                                <Stack direction="row" spacing={1.5} justifyContent="center">
                                    <Button
                                        onClick={() => handleDemoLogin(2)}
                                        variant="soft"
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: '#4318FF',
                                            bgcolor: 'rgba(67, 24, 255, 0.08)',
                                            px: 2
                                        }}
                                    >
                                        Admin
                                    </Button>
                                    <Button
                                        onClick={() => handleDemoLogin(1)}
                                        variant="soft"
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: '#05CD99',
                                            bgcolor: 'rgba(5, 205, 153, 0.08)',
                                            px: 2
                                        }}
                                    >
                                        Teacher
                                    </Button>
                                    <Button
                                        onClick={() => handleDemoLogin(0)}
                                        variant="soft"
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: '#FFB547',
                                            bgcolor: 'rgba(255, 181, 71, 0.08)',
                                            px: 2
                                        }}
                                    >
                                        User
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>
            </Box>
        </Box>
    );
};

export default LoginPage;
