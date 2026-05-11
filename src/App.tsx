import React, { useState, type ChangeEvent } from 'react';
import { Container, Box, Snackbar, Alert, Grid } from '@mui/material';
import {
    LocationOn,
    CardGiftcard,
    MenuBook,
} from '@mui/icons-material';
import {
    LanguageSwitcher,
    DressCodeCarousel,
    HeroSection,
    PhotoSection,
    ScheduleCard,
    InfoCard,
    DressCodeSection,
    RSVPFormComponent
} from './components';
import { useTranslation } from './hooks/useTranslation';
import { sendToGoogleSheets } from './services/googleSheetsService';
import {
    getScheduleData,
    getTransferData,
    getGiftsData,
    getMenuData,
    dressCodeColors,
} from './data/content';
import photo from './assets/images/couple-photo.png';

interface RSVPFormData {
    fullName: string;
    attendance: 'yes' | 'no';
}

const App: React.FC = () => {
    const { t, language, changeLanguage } = useTranslation();
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<RSVPFormData>({
        fullName: '',
        attendance: 'yes',
    });

    const backgroundGradient = `linear-gradient(135deg, 
    rgba(248, 228, 115, 0.40) 0%,
    rgba(255, 180, 15, 0.40) 20%,
    rgba(167, 180, 8, 0.40) 40%,
    rgba(150, 193, 221, 0.40) 60%,
    rgba(228, 30, 113, 0.40) 80%,
    rgba(248, 228, 115, 0.40) 100%)`;

    const accentColor = dressCodeColors[2].code;
    const buttonGradient = `linear-gradient(90deg, ${dressCodeColors[1].code}, ${dressCodeColors[2].code})`;

    // Подготовка данных для компонентов
    const scheduleItems = getScheduleData(language);
    const transferItems = getTransferData(language);
    const giftsItems = getGiftsData(language);
    const menuItems = getMenuData(language);

    const dressCodeColorsLocalized = dressCodeColors.map(color => ({
        name: language === 'ru' ? color.nameRu : color.nameEn,
        code: color.code,
        hex: color.hex,
    }));

    const dressCodeChips = [t('blackTie'), t('formalSuits'), t('eveningGowns'), t('dressShoes')];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (): Promise<void> => {
        if (!formData.fullName.trim()) {
            showSnackbar(t('pleaseEnterName'), 'error');
            return;
        }

        setIsSubmitting(true);

        const rsvpData = {
            fullName: formData.fullName.trim(),
            attendance: formData.attendance,
            language: language,
            timestamp: new Date().toISOString(),
        };

        try {
            const success = await sendToGoogleSheets(rsvpData);

            if (success) {
                const message = formData.attendance === 'yes'
                    ? `${formData.fullName}, ${t('thankYouYes')}`
                    : `${formData.fullName}, ${t('thankYouNo')}`;
                showSnackbar(message, 'success');
            } else {
                const fallbackMessage = formData.attendance === 'yes'
                    ? `${formData.fullName}, ${t('thankYouYes')} (${language === 'ru' ? 'сохранено локально' : 'saved locally'})`
                    : `${formData.fullName}, ${t('thankYouNo')} (${language === 'ru' ? 'сохранено локально' : 'saved locally'})`;
                showSnackbar(fallbackMessage, 'info');
            }

            setFormData({ fullName: '', attendance: 'yes' });
        } catch (error) {
            showSnackbar(
                language === 'ru' ? 'Ошибка при отправке. Пожалуйста, попробуйте позже.' : 'Error submitting. Please try again later.',
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info'): void => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: backgroundGradient,
                py: 4,
                px: 2,
                position: 'relative',
            }}
        >
            <LanguageSwitcher language={language} onLanguageChange={changeLanguage} />

            <Container maxWidth="md">
                <PhotoSection src={photo} alt={language === 'ru' ? 'Лёха и Маша' : 'Alex and Masha'} />

                <HeroSection
                    weddingTitle={t('wedding')}
                    coupleName={t('couple')}
                    location={t('location')}
                    accentColor={accentColor}
                />

                {/* Расписание дня - на всю ширину */}
                <ScheduleCard
                    title={language === 'ru' ? 'Расписание дня' : 'Schedule'}
                    items={scheduleItems}
                    accentColor={accentColor}
                />

                {/* Сбор и трансфер - на всю ширину */}
                <Box sx={{ mt: 4 }}>
                    <InfoCard
                        icon={<LocationOn />}
                        title={language === 'ru' ? 'Сбор и трансфер' : 'Meeting Point & Transfer'}
                        items={transferItems}
                        accentColor={accentColor}
                        columns={2}
                    />
                </Box>

                {/* Что дарить и Меню */}
                <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InfoCard
                            icon={<CardGiftcard />}
                            title={language === 'ru' ? 'Что дарить?' : 'Gifts'}
                            items={giftsItems}
                            accentColor={accentColor}
                            columns={1}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InfoCard
                            icon={<MenuBook />}
                            title={language === 'ru' ? 'Меню' : 'Menu'}
                            items={menuItems}
                            accentColor={accentColor}
                            columns={1}
                        />
                    </Grid>
                </Grid>

                <DressCodeSection
                    title={t('dressCode')}
                    description={`${t('dressCodeDescription')} ${t('recommendedPalette')}`}
                    colors={dressCodeColorsLocalized}
                    chips={dressCodeChips}
                    accentColor={accentColor}
                />

                <DressCodeCarousel title={language === 'ru' ? 'Примеры образов' : 'Style Examples'} language={language} />

                <RSVPFormComponent
                    title={t('confirmAttendance')}
                    subtitle={t('pleaseRespondBy')}
                    nameLabel={t('yourName')}
                    namePlaceholder={t('yourNamePlaceholder')}
                    attendanceLabel={t('willYouAttend')}
                    yesLabel={t('yesAttend')}
                    noLabel={t('noAttend')}
                    submitLabel={t('submitResponse')}
                    fullName={formData.fullName}
                    attendance={formData.attendance}
                    isSubmitting={isSubmitting}
                    onNameChange={handleChange}
                    onAttendanceChange={handleChange}
                    onSubmit={handleSubmit}
                    buttonGradient={buttonGradient}
                />

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default App;