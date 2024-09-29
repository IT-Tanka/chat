import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessageToAI } from '../services/openAI';
import { getThreadMessages, updateThreadMessages } from '../services/firestore';
import styles from './ChatPage.module.css';

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
                const messagesWithTimestamp = fetchedMessages.map((msg) => {
                    let validTimestamp;

                    if (msg.timestamp && msg.timestamp.seconds !== undefined) {
                        validTimestamp = new Date(
                            msg.timestamp.seconds * 1000 + Math.floor(msg.timestamp.nanoseconds / 1000000)
                        );
                    } else {
                        validTimestamp = null;
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
                setError('Error sending message. Please try again.');
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
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {loading && <p>Loading...</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}
                {messages.length > 0 ? (
                    <h2 className={styles.chatTitle}>{messages[0].text}</h2>
                ) : (
                    <h2 className={styles.chatTitle}>Welcome to the Chat</h2>
                )}
                {messages.length === 0 ? (
                    <p>No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                                }`}
                        >
                            <div className={styles.messageContent}>
                                <strong>{msg.sender === 'user' ? 'User' : 'AI'}:</strong>
                                <div>{msg.text}</div>
                            </div>
                            <small className={styles.timestamp}>
                                {msg.timestamp ? msg.timestamp.toLocaleString() : 'No date available'}
                            </small>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.inputContainer}>
                <textarea
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    rows={1}
                    className={styles.messageInput}
                />
                <button onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;

