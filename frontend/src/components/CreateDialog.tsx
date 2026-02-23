import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, FormControlLabel, Checkbox, Box,
    FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip
} from '@mui/material';

interface FieldConfig {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'boolean' | 'select' | 'multiselect';
    required?: boolean;
    options?: { value: string | number; label: string }[];
}

interface CreateDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    fields: FieldConfig[];
}

const CreateDialog: React.FC<CreateDialogProps> = ({ open, onClose, onSubmit, title, fields }) => {
    const [formData, setFormData] = useState<any>({});

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        try {
            const processedData = { ...formData };
            fields.forEach(field => {
                if (field.type === 'number') {
                    processedData[field.name] = processedData[field.name] ? Number(processedData[field.name]) : 0;
                }
                if (field.type === 'boolean') {
                    processedData[field.name] = !!processedData[field.name];
                }
                // Ensure arrays for multiselect
                if (field.type === 'multiselect' && !processedData[field.name]) {
                    processedData[field.name] = [];
                }
            });
            onSubmit(processedData);
            setFormData({});
            onClose();
        } catch (error) {
            console.error("Form submission error", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {fields.map((field) => {
                        if (field.type === 'boolean') {
                            return (
                                <FormControlLabel
                                    key={field.name}
                                    control={
                                        <Checkbox
                                            checked={!!formData[field.name]}
                                            onChange={(e) => handleChange(field.name, e.target.checked)}
                                        />
                                    }
                                    label={field.label}
                                />
                            );
                        } else if (field.type === 'select') {
                            return (
                                <FormControl key={field.name} fullWidth required={field.required}>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        value={formData[field.name] || ''}
                                        label={field.label}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                    >
                                        {field.options?.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        } else if (field.type === 'multiselect') {
                            return (
                                <FormControl key={field.name} fullWidth required={field.required}>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        multiple
                                        value={formData[field.name] || []}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        input={<OutlinedInput label={field.label} />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {(selected as any[]).map((value) => {
                                                    const option = field.options?.find(o => o.value === value);
                                                    return <Chip key={value} label={option ? option.label : value} />;
                                                })}
                                            </Box>
                                        )}
                                    >
                                        {field.options?.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        } else {
                            return (
                                <TextField
                                    key={field.name}
                                    label={field.label}
                                    type={field.type}
                                    fullWidth
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            );
                        }
                    })}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDialog;
