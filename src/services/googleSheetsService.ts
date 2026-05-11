// src/services/googleSheetsService.ts

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbziieZ9RFcFCoK6qzDjb6v9hrKWcncn2lcUR5AUFnTKW11X2QpCu9SmsmPOmCxCSbjU/exec';

export const sendToGoogleSheets = async (data: any): Promise<boolean> => {
    try {
        // Используем fetch вместо axios для лучшей совместимости
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Важно: no-cors режим
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // В режиме no-cors мы не можем прочитать ответ
        // Поэтому просто считаем, что отправка успешна
        console.log('✅ Data sent to Google Sheets (no-cors mode)');
        return true;

    } catch (error) {
        console.error('❌ Error sending to Google Sheets:', error);
        return false;
    }
};