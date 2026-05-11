import React, { useState, type ChangeEvent } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Alert,
    Card,
    CardContent,
    Grid,
    Avatar,
    Snackbar,
    useTheme,
    useMediaQuery,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    FormControl,
    FormLabel,
    Chip,
    CircularProgress,
} from '@mui/material';
import {
    Celebration,
    PersonAdd,
    Restaurant,
    MusicNote,
    CheckCircle,
    Close,
    Schedule,
    LocationOn,
    CardGiftcard,
    MenuBook,
} from '@mui/icons-material';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { DressCodeCarousel } from './components/DressCodeCarousel';
import { useTranslation } from './hooks/useTranslation';
import { sendToGoogleSheets } from './services/googleSheetsService';

import photo from './assets/images/couple-photo.png'

interface RSVPFormData {
    fullName: string;
    attendance: 'yes' | 'no';
}

const App: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t, language, changeLanguage } = useTranslation();
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<RSVPFormData>({
        fullName: '',
        attendance: 'yes',
    });

    // Инвертированный и осветленный градиент фона
    const backgroundGradient = `linear-gradient(135deg, 
    rgba(248, 228, 115, 0.40) 0%,
    rgba(255, 180, 15, 0.40) 20%,
    rgba(167, 180, 8, 0.40) 40%,
    rgba(150, 193, 221, 0.40) 60%,
    rgba(228, 30, 113, 0.40) 80%,
    rgba(248, 228, 115, 0.40) 100%)`;

    // Цветовая палитра
    const dressCodeColors = [
        { name: language === 'ru' ? 'Лимонный Взбитый' : 'Lemon Whip', code: '#f8e473', hex: '#F8E473' },
        { name: language === 'ru' ? 'Солнечный Поп' : 'Sun Pop', code: '#ffb40f', hex: '#FFB40F' },
        { name: language === 'ru' ? 'Бабблтини' : 'Bubbletini', code: '#e41e71', hex: '#E41E71' },
        { name: language === 'ru' ? 'Дынный Поп' : 'Melon Pop', code: '#a7b408', hex: '#A7B408' },
        { name: language === 'ru' ? 'Авокадо' : 'Avocado', code: '#6b8e23', hex: '#6B8E23' },
        { name: language === 'ru' ? 'Бризовый Порт' : 'Breezy Harbor', code: '#96c1dd', hex: '#96C1DD' },
        { name: language === 'ru' ? 'Персиковый Закат' : 'Peach Sunset', code: '#ffb347', hex: '#FFB347' },
        { name: language === 'ru' ? 'Мятная Свежесть' : 'Mint Fresh', code: '#98ff98', hex: '#98FF98' },
    ];

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

    // Данные для блока информации
    const scheduleData = {
        icon: <Schedule sx={{ fontSize: 40 }} />,
        title: language === 'ru' ? 'Расписание дня' : 'Schedule',
        items: [
            {
                time: '15:00',
                title: language === 'ru' ? 'Сбор гостей' : 'Guest Gathering',
                description: language === 'ru' ? 'Начало сбора у места трансфера' : 'Meeting at transfer point'
            },
            {
                time: '15:30',
                title: language === 'ru' ? 'Отправление трансфера' : 'Transfer Departure',
                description: language === 'ru' ? 'Автобус отправляется на venue' : 'Bus departs to venue'
            },
            {
                time: '16:30',
                title: language === 'ru' ? 'Welcome-прием' : 'Welcome Reception',
                description: language === 'ru' ? 'Приветственные напитки и канапе' : 'Welcome drinks and canapes'
            },
            {
                time: '18:00',
                title: language === 'ru' ? 'Торжественная часть' : 'Ceremony',
                description: language === 'ru' ? 'Церемония бракосочетания' : 'Wedding ceremony'
            },
            {
                time: '19:00',
                title: language === 'ru' ? 'Ужин' : 'Dinner',
                description: language === 'ru' ? 'Трехразовое меню' : 'Three-course dinner'
            },
            {
                time: '21:00',
                title: language === 'ru' ? 'Танцы' : 'Dancing',
                description: language === 'ru' ? 'Музыка и развлечения' : 'Music and entertainment'
            },
            {
                time: '23:30',
                title: language === 'ru' ? 'Отправление трансфера' : 'Return Transfer',
                description: language === 'ru' ? 'Автобус отправляется обратно' : 'Bus returns'
            },
        ]
    };

    const transferData = {
        icon: <LocationOn sx={{ fontSize: 40 }} />,
        title: language === 'ru' ? 'Сбор и трансфер' : 'Meeting Point & Transfer',
        items: [
            {
                title: language === 'ru' ? '📍 Место сбора' : '📍 Meeting Point',
                description: language === 'ru'
                    ? 'Парковка ТЦ "Европолис", ул. Тверская 15, Москва'
                    : 'Europe Shopping Mall parking, Tverskaya 15, Moscow'
            },
            {
                title: language === 'ru' ? '🚌 Трансфер туда' : '🚌 Transfer to Venue',
                description: language === 'ru'
                    ? 'Автобус отправляется в 15:30. Просьба не опаздывать!'
                    : 'Bus departs at 3:30 PM. Please don\'t be late!'
            },
            {
                title: language === 'ru' ? '🚌 Трансфер обратно' : '🚌 Return Transfer',
                description: language === 'ru'
                    ? 'Автобус отправляется в 23:30 от ресторана'
                    : 'Bus departs from restaurant at 11:30 PM'
            },
            {
                title: language === 'ru' ? '🚗 Для гостей на авто' : '🚗 For Guests by Car',
                description: language === 'ru'
                    ? 'На ресторане есть бесплатная парковка'
                    : 'Free parking available at venue'
            },
        ]
    };

    const giftsData = {
        icon: <CardGiftcard sx={{ fontSize: 40 }} />,
        title: language === 'ru' ? 'Что дарить?' : 'Gifts',
        items: [
            {
                title: language === 'ru' ? '💝 Главное пожелание' : '💝 Main Wish',
                description: language === 'ru'
                    ? 'Ваше присутствие - лучший подарок!'
                    : 'Your presence is the best gift!'
            },
            {
                title: language === 'ru' ? '💰 Денежный конверт' : '💰 Cash Gift',
                description: language === 'ru'
                    ? 'Мы будем рады любому вкладу в наш семейный бюджет'
                    : 'We will be grateful for any contribution to our family budget'
            },
            {
                title: language === 'ru' ? '🎁 Пожелания' : '🎁 Wishes',
                description: language === 'ru'
                    ? 'Теплые слова и пожелания в открытке'
                    : 'Warm wishes in a card'
            },
        ]
    };

    const menuData = {
        icon: <MenuBook sx={{ fontSize: 40 }} />,
        title: language === 'ru' ? 'Меню' : 'Menu',
        items: [
            {
                title: language === 'ru' ? '🥗 Холодные закуски' : '🥗 Cold Appetizers',
                description: language === 'ru'
                    ? 'Рыбное ассорти, мясная нарезка, овощной тартар'
                    : 'Fish assortment, meat platter, vegetable tartare'
            },
            {
                title: language === 'ru' ? '🍲 Горячее' : '🍲 Hot Dishes',
                description: language === 'ru'
                    ? 'Мраморная говядина с трюфельным соусом или лосось с овощами-гриль'
                    : 'Marble beef with truffle sauce or salmon with grilled vegetables'
            },
            {
                title: language === 'ru' ? '🍰 Десерт' : '🍰 Dessert',
                description: language === 'ru'
                    ? 'Свадебный торт и фруктовый фреш'
                    : 'Wedding cake and fruit fresh'
            },
            {
                title: language === 'ru' ? '🥂 Напитки' : '🥂 Drinks',
                description: language === 'ru'
                    ? 'Открытый бар (вино, шампанское, безалкогольные напитки)'
                    : 'Open bar (wine, champagne, soft drinks)'
            },
        ]
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
                {/* Фото молодоженов */}
                <Paper
                    elevation={3}
                    sx={{
                        mb: 4,
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ position: 'relative', height: isMobile ? 300 : 500 }}>
                        <img
                            src={photo}
                            alt={language === 'ru' ? 'Лёхица и Махица' : 'Lyosha and Masha'}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                color: 'white',
                                p: 4,
                                textAlign: 'center',
                            }}
                        >
                        </Box>
                    </Box>
                </Paper>

                {/* Hero Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 4,
                        textAlign: 'center',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            background: `linear-gradient(135deg, ${dressCodeColors[1].code}, ${dressCodeColors[2].code})`,
                            margin: '0 auto 16px',
                        }}
                    >
                        <Celebration sx={{ fontSize: 48 }} />
                    </Avatar>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {t('wedding')}
                    </Typography>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        {t('couple')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        {t('location')}
                    </Typography>
                </Paper>

                {/* Расписание дня и Сбор и трансфер в одном ряду */}
                {/* Расписание дня и Сбор и трансфер в одном ряду */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                    {/* Расписание дня */}
                    <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' } }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Schedule sx={{ fontSize: 40, color: dressCodeColors[2].code }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {language === 'ru' ? 'Расписание дня' : 'Schedule'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>15:00</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Сбор гостей' : 'Guest Gathering'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Начало сбора у места трансфера' : 'Meeting at transfer point'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>15:30</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Отправление трансфера' : 'Transfer Departure'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Автобус отправляется на venue' : 'Bus departs to venue'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>16:30</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Welcome-прием' : 'Welcome Reception'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Приветственные напитки и канапе' : 'Welcome drinks and canapes'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>18:00</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Торжественная часть' : 'Ceremony'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Церемония бракосочетания' : 'Wedding ceremony'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>19:00</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Ужин' : 'Dinner'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Трехразовое меню' : 'Three-course dinner'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>21:00</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Танцы' : 'Dancing'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Музыка и развлечения' : 'Music and entertainment'}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Typography variant="h6" sx={{ minWidth: '70px', fontWeight: 'bold', color: dressCodeColors[2].code }}>23:30</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{language === 'ru' ? 'Отправление трансфера' : 'Return Transfer'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{language === 'ru' ? 'Автобус отправляется обратно' : 'Bus returns'}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Сбор и трансфер */}
                    <Box sx={{ flex: 1, width: { xs: '100%', md: '50%' } }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <LocationOn sx={{ fontSize: 40, color: dressCodeColors[2].code }} />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {language === 'ru' ? 'Сбор и трансфер' : 'Meeting Point & Transfer'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            {language === 'ru' ? '📍 Место сбора' : '📍 Meeting Point'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {language === 'ru' ? 'Парковка ТЦ "Европолис", ул. Тверская 15, Москва' : 'Europe Shopping Mall parking, Tverskaya 15, Moscow'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            {language === 'ru' ? '🚌 Трансфер туда' : '🚌 Transfer to Venue'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {language === 'ru' ? 'Автобус отправляется в 15:30. Просьба не опаздывать!' : 'Bus departs at 3:30 PM. Please don\'t be late!'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            {language === 'ru' ? '🚌 Трансфер обратно' : '🚌 Return Transfer'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {language === 'ru' ? 'Автобус отправляется в 23:30 от ресторана' : 'Bus departs from restaurant at 11:30 PM'}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                            {language === 'ru' ? '🚗 Для гостей на авто' : '🚗 For Guests by Car'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {language === 'ru' ? 'На ресторане есть бесплатная парковка' : 'Free parking available at venue'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Что дарить и Меню */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Box sx={{ color: dressCodeColors[2].code }}>{giftsData.icon}</Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {giftsData.title}
                                    </Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    {giftsData.items.map((item, idx) => (
                                        <Grid item xs={12} key={idx}>
                                            <Box sx={{ p: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Box sx={{ color: dressCodeColors[2].code }}>{menuData.icon}</Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {menuData.title}
                                    </Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    {menuData.items.map((item, idx) => (
                                        <Grid item xs={12} key={idx}>
                                            <Box sx={{ p: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Dress Code Card */}
                <Card
                    elevation={10}
                    sx={{
                        borderRadius: 4,
                        mb: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <PersonAdd sx={{ fontSize: 32, color: dressCodeColors[2].code, mr: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {t('dressCode')}
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {t('dressCodeDescription')} {t('recommendedPalette')}
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {dressCodeColors.map((color) => (
                                <Grid item xs={6} sm={4} md={3} key={color.name}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            p: 1,
                                            borderRadius: 2,
                                            bgcolor: 'white',
                                            boxShadow: 1,
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 2,
                                                bgcolor: color.code,
                                                boxShadow: 1,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                {color.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {color.hex}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                background: `linear-gradient(90deg, 
                  ${dressCodeColors[0].code}, 
                  ${dressCodeColors[1].code}, 
                  ${dressCodeColors[3].code}, 
                  ${dressCodeColors[5].code})`,
                                borderRadius: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'center',
                            }}
                        >
                            <Chip
                                label={t('blackTie')}
                                sx={{ backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                            />
                            <Chip
                                label={t('formalSuits')}
                                sx={{ backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                            />
                            <Chip
                                label={t('eveningGowns')}
                                sx={{ backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                            />
                            <Chip
                                label={t('dressShoes')}
                                sx={{ backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* Dress Code Carousel */}
                <DressCodeCarousel
                    title={language === 'ru' ? 'Примеры образов' : 'Style Examples'}
                    language={language}
                />

                {/* RSVP Form Card */}
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
                            {t('confirmAttendance')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                            {t('pleaseRespondBy')}
                        </Typography>

                        <Box component="form" sx={{ maxWidth: 500, mx: 'auto' }}>
                            <TextField
                                fullWidth
                                label={t('yourName')}
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                margin="normal"
                                required
                                placeholder={t('yourNamePlaceholder')}
                                disabled={isSubmitting}
                            />

                            <FormControl component="fieldset" sx={{ my: 3, width: '100%' }}>
                                <FormLabel component="legend">{t('willYouAttend')}</FormLabel>
                                <RadioGroup
                                    name="attendance"
                                    value={formData.attendance}
                                    onChange={handleChange}
                                    row={!isMobile}
                                    sx={{ mt: 1 }}
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label={t('yesAttend')}
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label={t('noAttend')}
                                        disabled={isSubmitting}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                size="large"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    background: `linear-gradient(90deg, ${dressCodeColors[1].code}, ${dressCodeColors[2].code})`,
                                    '&:hover': {
                                        background: `linear-gradient(90deg, ${dressCodeColors[2].code}, ${dressCodeColors[1].code})`,
                  },
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('submitResponse')
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default App;