
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Убедитесь, что это URL вашего json-server

export const login = async (credentials) => {
    // Поскольку json-server не поддерживает аутентификацию из коробки,
    // вы можете просто эмулировать эту функцию или использовать другой сервер.
    return { data: { userId: 1 } }; // Эмуляция успешного ответа
};

export const register = async (userData) => {
    // Эмулируйте регистрацию
    return { data: { userId: 1 } }; // Эмуляция успешного ответа
};

export const getThreads = async () => {
    return await axios.get(`${API_URL}/threads`);
};

export const createThread = async (threadData) => {
    return await axios.post(`${API_URL}/threads`, threadData);
};

export const getMessages = async (threadId) => {
    return await axios.get(`${API_URL}/messages?threadId=${threadId}`);
};

export const sendMessage = async (threadId, messageData) => {
    return await axios.post(`${API_URL}/messages`, { ...messageData, threadId });
};
