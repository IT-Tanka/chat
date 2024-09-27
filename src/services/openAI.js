import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser:true
});

export const sendMessageToAI = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        });

        return response.choices[0].message.content;

    } catch (error) {
        if (error.status === 429) {
            console.error('Слишком много запросов. Повторите попытку позже.');
        } else {
            console.error('Ошибка при взаимодействии с OpenAI:', error.message || error);
        }
        throw error;
    }
};
