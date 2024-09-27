import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessageToAI } from '../services/openAI';
import { getThreadMessages } from '../services/firestore';

const ChatPage = () => {
    const { threadId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const fetchedMessages = await getThreadMessages(threadId);
            setMessages(fetchedMessages);
        };
        fetchMessages();
    }, [threadId]);

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const newMessage = { text: inputMessage, sender: 'user' };
            setMessages([...messages, newMessage]);
            setInputMessage('');

            try {
                const aiResponse = await sendMessageToAI(inputMessage);
                setMessages([...messages, newMessage, { text: aiResponse, sender: 'ai' }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <h2>Chat with AI</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
