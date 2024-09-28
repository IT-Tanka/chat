import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessageToAI } from '../services/openAI';
import { getThreadMessages, updateThreadMessages } from '../services/firestore';

const ChatPage = () => {
    const { threadId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await getThreadMessages(threadId);
                console.log('Fetched messages:', fetchedMessages); // Отладка
    
                const messagesWithTimestamp = fetchedMessages.map(msg => {
                    let validTimestamp;
    
                    // Проверка, содержит ли msg.timestamp seconds и nanoseconds
                    if (msg.timestamp && msg.timestamp.seconds !== undefined) {
                        // Преобразование в миллисекунды
                        validTimestamp = new Date(msg.timestamp.seconds * 1000 + Math.floor(msg.timestamp.nanoseconds / 1000000));
                    } else {
                        validTimestamp = null; // Или используйте new Date() для текущего времени
                    }
    
                    return {
                        ...msg,
                        timestamp: validTimestamp,
                    };
                });
    
                setMessages(messagesWithTimestamp);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [threadId]);
    

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const newMessage = { text: inputMessage, sender: 'user', timestamp: new Date() };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setInputMessage('');
            setError(null);

            await updateThreadMessages(threadId, updatedMessages);

            setLoading(true);
            try {
                const aiResponse = await sendMessageToAI(inputMessage);
                const aiMessage = { text: aiResponse, sender: 'ai', timestamp: new Date() };
                const finalMessages = [...updatedMessages, aiMessage];
                setMessages(finalMessages);

                await updateThreadMessages(threadId, finalMessages);
            } catch (error) {
                console.error('Error sending message:', error);
                setError('Ошибка при отправке сообщения. Попробуйте еще раз.');
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    return (
        <div>
            <h2>Chat with AI</h2>
            <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {messages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} style={{ margin: '10px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                            <strong>{msg.sender === 'user' ? 'User' : 'AI'}:</strong>
                            <div>{msg.text}</div>
                            <small style={{ fontStyle: 'italic', color: 'gray' }}>
                                {msg.timestamp ? msg.timestamp.toLocaleString() : 'No date available'}
                            </small>
                        </div>
                    ))
                )}
            </div>
            {/* <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            /> */}
            <textarea
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                rows={1}
                style={{
                    width: '100%',
                    resize: 'none',
                    overflow: 'hidden',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
