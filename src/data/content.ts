export interface ScheduleItem {
    time: string;
    title: string;
    description: string;
}

export interface InfoItem {
    title: string;
    description: string;
}

export const getScheduleData = (language: 'ru' | 'en'): ScheduleItem[] => [
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
];

export const getTransferData = (language: 'ru' | 'en'): InfoItem[] => [
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
];

export const getGiftsData = (language: 'ru' | 'en'): InfoItem[] => [
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
];

export const getMenuData = (language: 'ru' | 'en'): InfoItem[] => [
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
];

export const dressCodeColors = [
    { nameRu: 'Лимонный Взбитый', nameEn: 'Lemon Whip', code: '#f8e473', hex: '#F8E473' },
    { nameRu: 'Солнечный Поп', nameEn: 'Sun Pop', code: '#ffb40f', hex: '#FFB40F' },
    { nameRu: 'Бабблтини', nameEn: 'Bubbletini', code: '#e41e71', hex: '#E41E71' },
    { nameRu: 'Дынный Поп', nameEn: 'Melon Pop', code: '#a7b408', hex: '#A7B408' },
    { nameRu: 'Авокадо', nameEn: 'Avocado', code: '#6b8e23', hex: '#6B8E23' },
    { nameRu: 'Бризовый Порт', nameEn: 'Breezy Harbor', code: '#96c1dd', hex: '#96C1DD' },
    { nameRu: 'Персиковый Закат', nameEn: 'Peach Sunset', code: '#ffb347', hex: '#FFB347' },
    { nameRu: 'Мятная Свежесть', nameEn: 'Mint Fresh', code: '#98ff98', hex: '#98FF98' },
];