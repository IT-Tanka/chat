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
            console.error('Too many requests. Please try again later.');
        } else {
            console.error('Error interacting with OpenAI:', error.message || error);
        }
        throw error;
    }
};
export const generateAIImage = async (prompt) => {
    try {
        const response = await openai.images.generate({
            prompt: prompt,  
            n: 1,         
            size: "1024x1024"  
        });

        return response.data[0].url;

    } catch (error) {
        console.error('Error generating image:', error.message || error);
        throw error;
    }
};