import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

// Function to send a text message to AI
export const sendMessageToAI = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        });

        return response.choices[0].message.content; // Returns the text response

    } catch (error) {
        if (error.status === 429) {
            console.error('Too many requests. Please try again later.');
        } else {
            console.error('Error interacting with OpenAI:', error.message || error);
        }
        throw error;
    }
};

// Function to generate an image
export const generateAIImage = async (prompt) => {
    try {
        const response = await openai.images.generate({
            prompt: prompt,  
            n: 1,         
            size: "1024x1024"  
        });

        return response.data[0].url; // Returns the image URL

    } catch (error) {
        console.error('Error generating image:', error.message || error);
        throw error;
    }
};

// Function to handle user messages
export const handleUserMessage = async (message) => {
    // Keywords for image generation
    const imageKeywords = [
        // English
        "generate an image", "create an image", "draw", "make a picture", "design a logo", 
        "create a drawing", "produce an illustration", "render an image", "sketch", "visualize", 
        "depict", "craft an image", "make an artwork", "illustrate", "paint",
        "draw", "generate", "design",

        // Russian
        "сгенерировать изображение", "создать изображение", "нарисуй", "сделай картинку", 
        "разработай логотип", "сделай рисунок", "произведи иллюстрацию", "отрисуй изображение", 
        "эскиз", "визуализируй", "изобрази", "создай картину", "проиллюстрируй", "раскрась",
        "генерируй", "создавай", "рисуй", "отрисуй", 
        "визуализируй", "изобрази", "раскрась",

        // Ukrainian
        "згенерувати зображення", "створити зображення", "намалюй", "зроби картинку", 
        "розроби логотип", "зроби малюнок", "створити ілюстрацію", "відтворити зображення", 
        "ескіз", "візуалізуй", "зобрази", "створи картину", "проілюструй", "розфарбуй",
        "генеруй", "створюй", "малюй", "створюй ілюстрацію", 
        "відтворюй", "візуалізуй", "зобрази", "створи", "розфарбуй"
    ];
    
    // Check if the message contains keywords for image generation
    const isImageRequest = imageKeywords.some(keyword => message.toLowerCase().includes(keyword));

    try {
        if (isImageRequest) {
            // Generate an image
            const imageResponse = await generateAIImage(message);
            return {
                text: '',  
                imageUrl: imageResponse  
            };
        } else {
            // Normal text request
            const textResponse = await sendMessageToAI(message);
            return {
                text: textResponse, 
                imageUrl: '' 
            };
        }
    } catch (error) {
        console.error('Error processing the message:', error);
        throw error;
    }
};
