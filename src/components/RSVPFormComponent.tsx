import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Box,
    CircularProgress,
    useMediaQuery,
} from '@mui/material';

interface RSVPFormComponentProps {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    yesLabel: string;
    noLabel: string;
    submitLabel: string;
    fullName: string;
    attendance: 'yes' | 'no';
    isSubmitting: boolean;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAttendanceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    buttonGradient: string;
}

export const RSVPFormComponent: React.FC<RSVPFormComponentProps> = ({
                                                                        title,
                                                                        subtitle,
                                                                        nameLabel,
                                                                        namePlaceholder,
                                                                        attendanceLabel,
                                                                        yesLabel,
                                                                        noLabel,
                                                                        submitLabel,
                                                                        fullName,
                                                                        attendance,
                                                                        isSubmitting,
                                                                        onNameChange,
                                                                        onAttendanceChange,
                                                                        onSubmit,
                                                                        buttonGradient,
                                                                    }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Card
            elevation={10}
            sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                    {subtitle}
                </Typography>

                <Box component="form" sx={{ maxWidth: 500, mx: 'auto' }}>
                    <TextField
                        fullWidth
                        label={nameLabel}
                        name="fullName"
                        value={fullName}
                        onChange={onNameChange}
                        margin="normal"
                        required
                        placeholder={namePlaceholder}
                        disabled={isSubmitting}
                    />

                    <FormControl component="fieldset" sx={{ my: 3, width: '100%' }}>
                        <FormLabel component="legend">{attendanceLabel}</FormLabel>
                        <RadioGroup
                            name="attendance"
                            value={attendance}
                            onChange={onAttendanceChange}
                            row={!isMobile}
                            sx={{ mt: 1 }}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label={yesLabel} disabled={isSubmitting} />
                            <FormControlLabel value="no" control={<Radio />} label={noLabel} disabled={isSubmitting} />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onSubmit}
                        size="large"
                        sx={{
                            mt: 2,
                            py: 1.5,
                            background: buttonGradient,
                            '&:hover': { background: buttonGradient },
                        }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : submitLabel}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};