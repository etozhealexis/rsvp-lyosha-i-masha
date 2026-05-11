export type Language = 'ru' | 'en';

export interface Translations {
    // Hero section
    wedding: string;
    couple: string;
    location: string;

    schedule: string;
    transfer: string;
    gifts: string;
    menu: string;

    // Dress code
    dressCode: string;
    dressCodeDescription: string;
    recommendedPalette: string;
    blackTie: string;
    formalSuits: string;
    eveningGowns: string;
    dressShoes: string;

    // RSVP Form
    confirmAttendance: string;
    pleaseRespondBy: string;
    yourName: string;
    yourNamePlaceholder: string;
    willYouAttend: string;
    yesAttend: string;
    noAttend: string;
    submitResponse: string;

    // Event details
    buffetDinner: string;
    exquisiteMenu: string;
    liveMusic: string;
    djAndArtists: string;

    // Messages
    thankYouYes: string;
    thankYouNo: string;
    pleaseEnterName: string;

    // Navigation
    language: string;
}

export const translations: Record<Language, Translations> = {
    ru: {
        // Hero section
        wedding: 'Наша свадьба',
        couple: 'Лёхица & Махица',
        location: '📍 Москва, Онегин | 🗓 26 сентября 2026 | ⏰ 15:00',

        schedule: 'Расписание дня',
        transfer: 'Сбор и трансфер',
        gifts: 'Что дарить?',
        menu: 'Меню',

        // Dress code
        dressCode: 'Дресс-код: Evening Formal',
        dressCodeDescription: 'Вечерний наряд. Приветствуются элегантные платья и костюмы.',
        recommendedPalette: 'Рекомендуемая цветовая палитра:',
        blackTie: '✨ Черный галстук по желанию',
        formalSuits: '👔 Классические костюмы',
        eveningGowns: '💃 Вечерние платья',
        dressShoes: '👠 Классическая обувь',

        // RSVP Form
        confirmAttendance: 'Подтвердите присутствие',
        pleaseRespondBy: 'Пожалуйста, ответьте до 1 июня 2024',
        yourName: 'Ваше имя',
        yourNamePlaceholder: 'Например: Александр',
        willYouAttend: 'Вы сможете присутствовать?',
        yesAttend: '✅ Да, приду',
        noAttend: '❌ Нет, не смогу',
        submitResponse: 'Отправить ответ',

        // Event details
        buffetDinner: 'Фуршет & Ужин',
        exquisiteMenu: 'Изысканное меню от шеф-повара',
        liveMusic: 'Живая музыка',
        djAndArtists: 'DJ и приглашенные артисты',

        // Messages
        thankYouYes: 'Спасибо! Ждем вас на празднике! 🎉',
        thankYouNo: 'Нам будет вас не хватать. Спасибо за ответ! 💔',
        pleaseEnterName: 'Пожалуйста, укажите ваше имя',

        // Navigation
        language: 'Язык',
    },
    en: {
        // Hero section
        wedding: 'Our Wedding',
        couple: 'Lyohica & Mahica',
        location: '📍 Moscow, Onegin | 🗓 September 26, 2026 | ⏰ 3:00 PM',

        schedule: 'Schedule',
        transfer: 'Meeting Point & Transfer',
        gifts: 'Gifts',
        menu: 'Menu',

        // Dress code
        dressCode: 'Dress Code: Evening Formal',
        dressCodeDescription: 'Evening attire. Elegant dresses and suits are welcome.',
        recommendedPalette: 'Recommended color palette:',
        blackTie: '✨ Black Tie Optional',
        formalSuits: '👔 Formal Suits',
        eveningGowns: '💃 Evening Gowns',
        dressShoes: '👠 Dress Shoes',

        // RSVP Form
        confirmAttendance: 'Confirm Attendance',
        pleaseRespondBy: 'Please respond by June 1, 2024',
        yourName: 'Your name',
        yourNamePlaceholder: 'e.g., Alexander',
        willYouAttend: 'Will you attend?',
        yesAttend: '✅ Yes, I will attend',
        noAttend: '❌ No, I cannot attend',
        submitResponse: 'Submit Response',

        // Event details
        buffetDinner: 'Buffet & Dinner',
        exquisiteMenu: 'Exquisite menu from the chef',
        liveMusic: 'Live Music',
        djAndArtists: 'DJ and invited artists',

        // Messages
        thankYouYes: 'Thank you! We look forward to celebrating with you! 🎉',
        thankYouNo: 'We will miss you. Thank you for your response! 💔',
        pleaseEnterName: 'Please enter your name',

        // Navigation
        language: 'Language',
    },
};