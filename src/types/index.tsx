export interface RSVPFormData {
    fullName: string;
    email: string;
    phone: string;
    attendance: 'yes' | 'no' | 'maybe';
    guests: number;
    dietaryRestrictions: string[];
    songRequest: string;
    message: string;
}

export type DietaryOption =
    | 'Без глютена'
    | 'Вегетарианское'
    | 'Веганское'
    | 'Безлактозное'
    | 'Без орехов'
    | 'Морепродукты';