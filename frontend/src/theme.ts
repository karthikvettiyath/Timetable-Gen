import { createTheme } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4318FF', // Vibrant "Taskly" Blue/Purple
            light: '#7654FF',
            dark: '#2B00D4',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#6AD2FF', // Cyan Light
            light: '#9EE1FF',
            dark: '#00A3E0',
            contrastText: '#000000',
        },
        background: {
            default: '#F4F7FE', // Very light, clean gray-blue background
            paper: '#ffffff',
        },
        text: {
            primary: '#2B3674', // Deep Navy Blue for text (High Contrast)
            secondary: '#A3AED0', // Soft Gray-Blue for secondary text
        },
    },
    typography: {
        fontFamily: '"Poppins", "Inter", sans-serif', // Updated Font
        h1: { fontWeight: 700, color: '#2B3674' },
        h2: { fontWeight: 700, color: '#2B3674' },
        h3: { fontWeight: 700, color: '#2B3674' },
        h4: { fontWeight: 700, color: '#2B3674', letterSpacing: '-0.02em' },
        h5: { fontWeight: 600, color: '#2B3674' },
        h6: { fontWeight: 600, color: '#2B3674' },
        subtitle1: { color: '#A3AED0' },
        subtitle2: { color: '#A3AED0', fontWeight: 500 },
        button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
        borderRadius: 16, // Reduced slightly to prevent clipping issues
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                    border: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: 'none',
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                },
                contained: {
                    backgroundColor: '#4318FF',
                    '&:hover': {
                        backgroundColor: '#2B00D4',
                        boxShadow: '0px 10px 20px rgba(67, 24, 255, 0.2)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    color: '#2B3674',
                    borderRight: 'none',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    margin: '8px 12px',
                    padding: '12px 16px',
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                        backgroundColor: '#4318FF',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#2B00D4',
                        },
                        '& .MuiListItemIcon-root': {
                            color: '#ffffff',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(67, 24, 255, 0.05)',
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#A3AED0',
                    minWidth: 40,
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    borderRadius: 16,
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#F4F7FE',
                        color: '#A3AED0',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        borderBottom: 'none',
                        borderRadius: '16px 16px 0 0', // Round top corners of header
                    },
                    '& .MuiDataGrid-columnHeaderTitle': { // Ensure title has padding
                        paddingLeft: '8px',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #F4F7FE',
                        color: '#2B3674',
                        fontWeight: 500,
                        paddingLeft: '16px', // Extra spacing
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#F4F7FE',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    padding: '16px',
                    boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2B3674',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 16,
                        '& fieldset': {
                            borderColor: '#E0E5F2',
                        },
                        '&:hover fieldset': {
                            borderColor: '#4318FF',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#4318FF',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
