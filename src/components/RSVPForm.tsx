import React, {type ChangeEvent } from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    InputLabel,
    Box,
    Chip,
    type SelectChangeEvent,
} from '@mui/material';
import type {RSVPFormData, DietaryOption} from '../types';

interface RSVPFormProps {
    formData: RSVPFormData;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => void;
    onDietaryChange: (restriction: string) => void;
    isMobile: boolean;
    activeStep: number;
}

const dietaryOptions: DietaryOption[] = [
    'Без глютена',
    'Вегетарианское',
    'Веганское',
    'Безлактозное',
    'Без орехов',
    'Морепродукты',
];

export const RSVPForm: React.FC<RSVPFormProps> = ({
                                                      formData,
                                                      onChange,
                                                      onDietaryChange,
                                                      isMobile,
                                                      activeStep,
                                                  }) => {
    if (activeStep === 0) {
        return (
            <Box sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Ваше полное имя *"
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    margin="normal"
                    placeholder="+7 XXX XXX-XX-XX"
                />
            </Box>
        );
    }

    if (activeStep === 1) {
        return (
            <Box sx={{ mt: 2 }}>
                <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                    <FormLabel component="legend">Вы сможете присутствовать?</FormLabel>
                    <RadioGroup
                        name="attendance"
                        value={formData.attendance}
                        onChange={onChange}
                        row={!isMobile}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Да, буду" />
                        <FormControlLabel value="no" control={<Radio />} label="Нет, не смогу" />
                        <FormControlLabel value="maybe" control={<Radio />} label="Возможно" />
                    </RadioGroup>
                </FormControl>

                {formData.attendance === 'yes' && (
                    <>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Количество гостей (включая вас)</InputLabel>
                            <Select
                                name="guests"
                                value={formData.guests}
                                onChange={onChange}
                                label="Количество гостей (включая вас)"
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                            <FormLabel component="legend">Особые пожелания по питанию</FormLabel>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {dietaryOptions.map((option) => (
                                    <Chip
                                        key={option}
                                        label={option}
                                        onClick={() => onDietaryChange(option)}
                                        color={formData.dietaryRestrictions.includes(option) ? 'primary' : 'default'}
                                        variant={formData.dietaryRestrictions.includes(option) ? 'filled' : 'outlined'}
                                    />
                                ))}
                            </Box>
                        </FormControl>
                    </>
                )}
            </Box>
        );
    }

    if (activeStep === 2) {
        return (
            <Box sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Песня для танцев"
                    name="songRequest"
                    value={formData.songRequest}
                    onChange={onChange}
                    margin="normal"
                    placeholder="Какая песня создаст настроение?"
                    helperText="Мы постараемся включить ваш трек!"
                />
                <TextField
                    fullWidth
                    label="Пожелания и комментарии"
                    name="message"
                    value={formData.message}
                    onChange={onChange}
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder="Напишите нам что-нибудь приятное или задайте вопрос..."
                />
            </Box>
        );
    }

    return null;
};