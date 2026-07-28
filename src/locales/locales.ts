export type Language = 'ru' | 'sr';

export interface Translations {
    // Hero section
    wedding: string;
    couple: string;
    location: string;

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

    // Additional
    schedule: string;
    transfer: string;
    gifts: string;
    menu: string;
}

export const translations: Record<Language, Translations> = {
    ru: {
        wedding: 'Наша свадьба',
        couple: 'Маша и Лёша',
        location: '📍 Городской округ Пушкинский, Загородный клуб «Онегин», Малая веранда | 🗓 26 Сентября 2026 | ⏰ 16:00',

        dressCode: 'Дресс-код: Evening Formal',
        dressCodeDescription: 'Вечерний наряд. Приветствуются элегантные платья и костюмы.',
        recommendedPalette: 'Рекомендуемая цветовая палитра:',
        blackTie: '✨ Black Tie Optional',
        formalSuits: '👔 Классические костюми',
        eveningGowns: '💃 Вечерние платья',
        dressShoes: '👠 Классическая обувь',

        confirmAttendance: 'Подтвердите присутствие до 1 сентября',
        pleaseRespondBy: 'Пожалуйста, ответьте до 1 июня 2024',
        yourName: 'Ваше имя и фамилия',
        yourNamePlaceholder: 'Например: Александр',
        willYouAttend: 'Вы сможете присутствовать?',
        yesAttend: '✅ Да, приду',
        noAttend: '❌ Нет, не смогу',
        submitResponse: 'Отправить ответ',

        buffetDinner: 'Фуршет & Ужин',
        exquisiteMenu: 'Изысканное меню от шеф-повара',
        liveMusic: 'Живая музыка',
        djAndArtists: 'DJ и приглашенные артисты',

        thankYouYes: 'Спасибо! Ждем вас на празднике! 🎉',
        thankYouNo: 'Нам будет вас не хватать. Спасибо за ответ! 💔',
        pleaseEnterName: 'Пожалуйста, укажите ваше имя',

        language: 'Язык',

        schedule: 'Расписание дня',
        transfer: 'Сбор и трансфер',
        gifts: 'Что дарить?',
        menu: 'Меню',
    },

    sr: {
        wedding: 'Наше венчање',
        couple: 'Љоша и Маша',
        location: '📍 Москва, Ресторан "Инспирација" | 🗓 15. Јун 2024 | ⏰ 18:00',

        dressCode: 'Кодекс облачења: Evening Formal',
        dressCodeDescription: 'Вечерња одећа. Добродошле су елегантне хаљине и одели.',
        recommendedPalette: 'Препоручена палета боја:',
        blackTie: '✨ Black Tie Optional',
        formalSuits: '👔 Класична одела',
        eveningGowns: '💃 Вечерње хаљине',
        dressShoes: '👠 Класична обућа',

        confirmAttendance: 'Молимо вас да свој долазак потврдите најкасније до 1. септембра.',
        pleaseRespondBy: 'Молимо вас да одговорите до 1. јуна 2024.',
        yourName: 'Ваше име и презиме',
        yourNamePlaceholder: 'На пример: Александар',
        willYouAttend: 'Моћи ћете да присуствујете?',
        yesAttend: '✅ Да, доћи ћу',
        noAttend: '❌ Не, нећу моћи',
        submitResponse: 'Потврди долазак',

        buffetDinner: 'Шведски сто & Вечера',
        exquisiteMenu: 'Изврстан мени од шеф-кувара',
        liveMusic: 'Уживо музика',
        djAndArtists: 'DJ и позвани уметници',

        thankYouYes: 'Хвала вам! Чекамо вас на нашем венчању! 🎉',
        thankYouNo: 'Недостајаћете нам. Хвала на одговору! 💔',
        pleaseEnterName: 'Молимо вас да унесете ваше име',

        language: 'Језик',

        schedule: 'Распорeд дана',
        transfer: 'Окупљање и трансфер',
        gifts: 'Шта поклонити?',
        menu: 'Мени',
    },
};