import React, {useState, type ChangeEvent} from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useTranslation} from '../hooks/useTranslation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {DressCodeCarousel} from './DressCodeCarousel';
import {sendToGoogleSheets} from '../services/googleSheetsService';
import china from '../assets/images/our-photos/china.png';
import paris from '../assets/images/our-photos/paris.png';
import carcassone from '../assets/images/our-photos/carcassone.png';
import japan from '../assets/images/our-photos/japan.png';
import cute from '../assets/images/our-photos/cute.jpg';
import kaliningrad from '../assets/images/our-photos/kaliningrad.png';
import ColorPalette from "./ColorPalette.tsx";
import DecorativeFlower from "./DecorativeFlower.tsx";
import {useRandomFlowers} from "../hooks/useRandomFlowers.ts";
import {MusicPlaylist} from "./MusicPlaylist.tsx";

const RotatedBox = styled(Box)(({theme}) => ({
    position: 'relative',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
        transform: 'rotate(0deg) !important',
    },
}));

const OffsetBox = styled(Box)(({theme}) => ({
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: 0,
    },
}));

const FloatingImage = styled(Box)(({theme}) => ({
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const CreativeWeddingLayout: React.FC = () => {
    const {t, language, changeLanguage} = useTranslation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        attendance: 'yes' as 'yes' | 'no',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        if (!formData.fullName.trim()) {
            showSnackbar(t('pleaseEnterName'), 'error');
            return;
        }
        setIsSubmitting(true);
        const rsvpData = {
            fullName: formData.fullName.trim(),
            attendance: formData.attendance,
            language,
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
            setFormData({fullName: '', attendance: 'yes'});
        } catch (error) {
            showSnackbar(
                language === 'ru' ? 'Ошибка при отправке. Попробуйте позже.' : 'Error submitting. Try again later.',
                'error'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const texts = {
        hero: {
            date: language === 'ru' ? '26 Сентября 2026' : '26. Септембар 2026',
            couple: language === 'ru' ? 'Маша и Лёша' : 'Маша и Лjоша'
        },
        invitation: {
            greeting: language === 'ru'
                ? 'Дорогие, родные и близкие! Приглашаем вас на наш первый семейный праздник - нашу свадьбу!'
                : 'Драги наши, родбино и пријатељи! Позивамо вас да са нама поделите радост нашег првог породичног славља – нашег венчања!',
            when: language === 'ru' ? 'Будем ждать вас' : 'Са радошћу вас очекујемо',
            where: language === 'ru' ? 'Встретимся' : 'Видимо се',
            whereDesc: language === 'ru'
                ? 'среди зелёного леса на малой веранде '
                : 'у срцу зелене шуме, на малој веранди  '
        },
        schedule: {
            title: language === 'ru' ? 'Что вас ждёт:' : 'Како ће изгледати наш дан:',
            items: [
                {time: '16:00', title: language === 'ru' ? 'Сбор гостей' : 'Дочек гостију', desc: ''},
                {time: '16:45', title: language === 'ru' ? 'Церемония' : 'Церемонија венчања', desc: ''},
                {time: '17:30', title: language === 'ru' ? 'Свадебный ужин' : 'Свечана вечера и свадбено славље', desc: ''},
                {time: '22:00', title: language === 'ru' ? 'Завершение банкета' : 'Завршетак свечаности', desc: ''},
                {time: '23:00', title: language === 'ru' ? 'Трансфер до ВДНХ' : 'Организован превоз до ВДНХ', desc: ''},
            ],
        },
        gifts: {
            text: language === 'ru'
                ? 'Не ломайте голову - ваши пожелания в конвертах станут ключом к нашим мечтам.'
                : 'Не оптерећујте се избором поклона – ваша пажња у коверти помоћи ће нам да остваримо своје снове.',
        },
    };

    const allFlowers = useRandomFlowers(228, 'full');
    const giftsFlowers = useRandomFlowers(6, 'gifts');

    return (
        <Box sx={{position: 'relative', overflow: 'hidden', bgcolor: '#faf7f2'}}>
            <LanguageSwitcher language={language} onLanguageChange={changeLanguage}/>

            {/* Фоновые цветы - растягиваем на всю высоту контента */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            >
                {allFlowers.map((flower) => (
                    <DecorativeFlower
                        key={flower.id}
                        color={flower.color}
                        size={flower.size}
                        rotate={flower.rotate}
                        opacity={0.08}
                        style={{
                            top: flower.top,
                            left: flower.left,
                            position: 'absolute',
                        }}
                    />
                ))}
            </Box>

            <Box sx={{position: 'relative', zIndex: 1}}>
                {/* Hero секция с фото на фоне */}
                <Box sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    {/* Фото 1 - большое на фоне */}
                    <FloatingImage
                        sx={{
                            position: 'absolute',
                            top: { xs: '5%', md: '10%' },          // ← выше на мобильных
                            right: { xs: '-5%', md: '-5%' },      // ← сильно смещено вправо на мобильных, чтобы было видно край
                            width: { xs: '150px', md: '300px' },   // ← меньше на мобильных
                            height: { xs: '150px', md: '300px' },  // ← меньше на мобильных
                            transform: { xs: 'rotate(10deg)', md: 'rotate(15deg)' },
                            opacity: { xs: 0.3, md: 0.3 },       // ← чуть прозрачнее на мобильных
                            zIndex: 0,
                            display: { xs: 'block', md: 'block' }, // ← всегда показывается
                            pointerEvents: 'none',                 // ← чтобы не мешать кликам
                        }}
                    >
                        <Box
                            component="img"
                            src={paris}
                            alt="decoration"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: { xs: '12px', md: '20px' },
                            }}
                        />
                    </FloatingImage>

                    <Typography
                        variant="h1"
                        sx={{
                            position: 'absolute',
                            fontSize: {xs: '8rem', md: '18rem'},
                            fontWeight: 700,
                            color: 'rgba(228,30,113,0.08)',
                            transform: 'rotate(-15deg)',
                            top: {xs: '10%', md: '5%'},
                            left: {xs: '-1%', md: '-1%'},
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                        }}
                    >
                        26.09
                    </Typography>

                    {/* Фото 2 - маленькое, наезжающее на текст */}
                    <FloatingImage
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '5%', md: '15%' },        // ← выше на мобильных
                            left: { xs: '5%', md: '10%' },           // ← ближе к краю на мобильных
                            width: { xs: '110px', md: '180px' },      // ← меньше на мобильных
                            height: { xs: '110px', md: '180px' },     // ← меньше на мобильных
                            transform: { xs: 'rotate(-8deg)', md: 'rotate(-8deg)' },
                            zIndex: 3,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: { xs: '2px solid white', md: '4px solid white' },
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            display: { xs: 'block', md: 'block' },
                        }}
                    >
                        <Box
                            component="img"
                            src={carcassone}
                            alt="decoration"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </FloatingImage>

                    <Box sx={{textAlign: 'center', position: 'relative', zIndex: 2}}>
                        <Box sx={{position: 'relative', display: 'inline-block', mb: 3}}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: {xs: '3rem', md: '6rem'},
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #e41e71, #ffb40f)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    lineHeight: 2,
                                    paddingTop: '0.1em',
                                    paddingBottom: '0.1em',
                                    display: 'inline-block',
                                }}
                            >
                                {texts.hero.date}
                            </Typography>
                        </Box>

                        <OffsetBox sx={{ml: {md: 8}}}>
                            <Typography variant="h2"
                                        sx={{fontSize: {xs: '2rem', md: '3.5rem'}, fontWeight: 500}}>
                                {texts.hero.couple}
                            </Typography>
                        </OffsetBox>
                    </Box>
                </Box>

                {/* Фото молодоженов - центральное */}
                <Container maxWidth="md" sx={{py: 4, textAlign: 'center', position: 'relative'}}>
                    {/* Фото 3 - декоративное, вылетающее */}
                    <FloatingImage
                        sx={{
                            position: 'absolute',
                            top: { xs: '-30%', md: '-20%' },          // ← опускаем ниже на мобильных
                            right: { xs: '5%', md: '5%' },           // ← оставляем на месте
                            width: { xs: '100px', md: '120px' },      // ← меньше на мобильных
                            height: { xs: '100px', md: '120px' },     // ← меньше на мобильных
                            transform: { xs: 'rotate(15deg)', md: 'rotate(25deg)' },
                            zIndex: 1,
                            opacity: { xs: 1, md: 1 },
                            display: { xs: 'block', md: 'block' },
                            overflow: 'visible',
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src={cute}
                            alt="decoration"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: { xs: '10px', md: '15px' },
                                display: 'block',
                            }}
                        />
                    </FloatingImage>

                    <Box
                        component="img"
                        src={china}
                        alt={language === 'ru' ? 'Маша и Лёша' : 'Маша и Љоша'}
                        sx={{
                            width: '100%',
                            maxWidth: 400,
                            height: 'auto',
                            borderRadius: '50%',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    />
                </Container>

                {/* Секция с приглашением */}
                <Container maxWidth="lg" sx={{position: 'relative', zIndex: 2, py: 8}}>

                    <Box sx={{position: 'relative'}}>
                        {/* Фото 4 - плавающее */}
                        <FloatingImage
                            sx={{
                                position: 'absolute',
                                bottom: { xs: '-10%', md: '-10%' },
                                left: { xs: '-5%', md: '-5%' },
                                width: { xs: '100px', md: '150px' },
                                height: { xs: '100px', md: '150px' },
                                transform: { xs: 'rotate(-12deg)', md: 'rotate(-12deg)' },
                                zIndex: 0,
                                opacity: { xs: 0.8, md: 0.8 },
                                overflow: 'visible',
                                pointerEvents: 'none',
                            }}
                        >
                            <Box
                                component="img"
                                src={japan}
                                alt="decoration"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: { xs: '12px', md: '20px' },
                                    display: 'block',
                                }}
                            />
                        </FloatingImage>

                        <OffsetBox sx={{mb: 4, display: 'flex', justifyContent: 'center'}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '2rem',
                                    maxWidth: '70%',
                                    pl: 3,
                                    textAlign: 'center',
                                    fontWeight: 400,
                                }}
                            >
                                {texts.invitation.greeting}
                            </Typography>
                        </OffsetBox>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                            <RotatedBox sx={{transform: 'rotate(-4deg)', mt: 4}}>
                                <Typography variant="h4" sx={{fontWeight: 700}}>
                                    {texts.invitation.when}
                                </Typography>
                                <br/>
                                <Typography variant="h2" sx={{fontSize: '3rem', fontWeight: 800, color: '#e41e71'}}>
                                    {language === 'ru' ? '26 сентября 2026' : '26. септембра 2026. године'}
                                </Typography>
                            </RotatedBox>

                            <RotatedBox sx={{
                                transform: 'rotate(2deg)',
                                bgcolor: '#ffb40f',
                                p: 6,
                                width: {xs: '100%', md: 'auto'},
                                mt: {xs: 4, md: 0}
                            }}>
                                <Typography variant="h3" sx={{fontWeight: 700}}>
                                    {texts.invitation.where}
                                </Typography>
                                <br/>
                                <Typography variant="h4" sx={{maxWidth: 300}}>
                                    {texts.invitation.whereDesc}
                                    {language === 'ru' ?
                                        <a
                                            href="https://yandex.ru/maps/-/CTb1iGiV"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{color: '#e41e71', textDecoration: 'underline'}}
                                        >
                                            Загородного клуба «Онегин»
                                        </a>
                                        :
                                        <a
                                            href="https://yandex.ru/maps/-/CTb1iGiV"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{color: '#e41e71', textDecoration: 'underline'}}
                                        >
                                            Загородног клуба «Оњегин»
                                        </a>
                                    }
                                </Typography>
                            </RotatedBox>
                        </Box>
                    </Box>
                </Container>

                {/* Расписание + цветовая палитра */}
                <Container maxWidth="lg" sx={{py: 8, position: 'relative'}}>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: {xs: 4, md: 8},
                        alignItems: 'flex-start'
                    }}>
                        {/* Левая колонка - расписание */}
                        <Box sx={{flex: 2}}>
                            <Typography variant="h3" sx={{textAlign: 'left', mb: 6, position: 'relative', fontWeight: 700}}>
                                {texts.schedule.title}
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -10,
                                    left: 0,
                                    width: 60,
                                    height: 2,
                                    bgcolor: '#e41e71'
                                }}/>
                            </Typography>

                            <Box sx={{position: 'relative'}}>
                                {texts.schedule.items.map((item, idx) => (
                                    <RotatedBox
                                        key={idx}
                                        sx={{
                                            transform: {xs: 'rotate(0deg)', md: `rotate(${[-2, 1, -1, 2][idx]}deg)`},
                                            ml: {md: `${[-20, 30, -10, 40][idx]}px`},
                                            mb: 4,
                                            display: 'flex',
                                            flexDirection: {xs: 'column', md: 'row'},
                                            alignItems: 'baseline',
                                            gap: 2,
                                            borderBottom: '1px solid #eee',
                                            pb: 2,
                                        }}
                                    >
                                        <Typography variant="h2" sx={{
                                            fontSize: '3rem',
                                            fontWeight: 800,
                                            color: '#e41e71',
                                            minWidth: 120
                                        }}>
                                            {item.time}
                                        </Typography>
                                        <Box>
                                            <Typography variant="h5" sx={{fontWeight: 500}}>{item.title}</Typography>
                                            {item.desc && <Typography variant="body2"
                                                                      color="text.secondary">{item.desc}</Typography>}
                                        </Box>
                                    </RotatedBox>
                                ))}
                            </Box>
                        </Box>

                        {/* Правая колонка - цветовая палитра (вынесена в компонент) */}
                        <ColorPalette language={language}/>
                    </Box>
                </Container>

                {/* Карусель и подарки в одной строке */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 4,
                    alignItems: 'stretch',
                    my: 8,
                    position: 'relative',
                }}>
                    {/* Левая колонка - карусель */}
                    <Box sx={{flex: 1}}>
                        <DressCodeCarousel
                            title={language === 'ru' ? 'Примеры для вдохновения' : 'Инспирација за ваш избор'}
                            language={language}
                        />
                    </Box>

                    {/* Правая колонка - блок подарков с фоном */}
                    <Box sx={{flex: 1, position: 'relative'}}>
                        <Box sx={{
                            bgcolor: '#fff5e6',
                            p: 4,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            {/* Декоративные цветы на фоне блока */}
                            {giftsFlowers.map((flower) => (
                                <DecorativeFlower
                                    key={flower.id}
                                    color={flower.color}
                                    size={flower.size}
                                    rotate={flower.rotate}
                                    opacity={0.1}
                                    style={{
                                        top: flower.top,
                                        right: flower.right,
                                        position: 'absolute',
                                        zIndex: 0,
                                    }}
                                />
                            ))}

                            <Box sx={{position: 'relative', zIndex: 1, textAlign: 'center'}}>
                                <Typography variant="h1" sx={{
                                    fontSize: {xs: '3.5rem', md: '3.5rem'},
                                    fontWeight: 800,
                                    color: '#e41e71',
                                    letterSpacing: '0.05em'
                                }}>
                                    {language === 'ru' ? 'Что подарить?' : 'Шта поклонити?'}
                                </Typography>
                                <br/>
                                <br/>
                                <Typography variant="h4" sx={{fontWeight: 300, mb: 3, maxWidth: 500, mx: 'auto'}}>
                                    {texts.gifts.text}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <MusicPlaylist language={language}/>

                {/* RSVP форма */}
                <Container maxWidth="sm" sx={{py: 8, textAlign: 'center', position: 'relative'}}>

                    {/* Фото 8 - последний акцент */}
                    <FloatingImage
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '1%', md: '-5%' },         // ← поднимаем выше на мобильных
                            right: { xs: '1%', md: '-5%' },          // ← сдвигаем влево на мобильных
                            width: { xs: '80px', md: '100px' },      // ← меньше на мобильных
                            height: { xs: '80px', md: '100px' },     // ← меньше на мобильных
                            transform: { xs: 'rotate(-5deg)', md: 'rotate(-5deg)' },
                            zIndex: 0,
                            opacity: { xs: 0.8, md: 0.8 },           // ← прозрачнее на мобильных
                            display: { xs: 'block', md: 'block' },
                            overflow: 'visible',
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src={kaliningrad}
                            alt="decoration"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: { xs: '8px', md: '10px' },
                                display: 'block',
                            }}
                        />
                    </FloatingImage>

                    <Typography variant="h4" sx={{mb: 4, fontWeight: 300}}>
                        { language === 'ru' ?
                            'По вопросам можете обращаться к нашему организатору.'
                            :
                            'Уколико имате било каквих питања, наша организаторка ће вам радо помоћи.'}
                        <br/>
                        +7 (951) 673-47-37, Вероника
                        <br/>
                        <a
                            href="https://t.me/korotina_v"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: '#24a1de', textDecoration: 'underline'}}
                        >
                            Telegram
                        </a>
                        ,&nbsp;
                        <a
                            href="https://wa.me/send?phone=79516734737"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: '#25d366', textDecoration: 'underline'}}
                        >
                            WhatsApp
                        </a>
                    </Typography>

                    <Typography variant="h4" sx={{mb: 4, fontWeight: 600}}>
                        {t('confirmAttendance')}
                    </Typography>

                    <Box component="form" sx={{maxWidth: 400, mx: 'auto'}}>
                        <TextField
                            fullWidth
                            label={t('yourName')}
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            margin="normal"
                            required
                            variant="standard"
                            disabled={isSubmitting}
                        />
                        <FormControl component="fieldset" sx={{my: 3, width: '100%'}}>
                            <RadioGroup
                                name="attendance"
                                value={formData.attendance}
                                onChange={handleChange}
                                row
                                sx={{justifyContent: 'center', mt: 1}}
                            >
                                <FormControlLabel value="yes" control={<Radio/>} label={t('yesAttend')}
                                                  disabled={isSubmitting}/>
                                <FormControlLabel value="no" control={<Radio/>} label={t('noAttend')}
                                                  disabled={isSubmitting}/>
                            </RadioGroup>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleSubmit}
                            size="large"
                            sx={{mt: 2, py: 1.5, borderWidth: 2, borderRadius: 0, letterSpacing: '0.1em'}}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size={24}/> : t('submitResponse')}
                        </Button>
                    </Box>
                </Container>

                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => setOpenSnackbar(false)}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};