
import React, { useRef, useEffect } from 'react';
import styles from './MessageList.module.css';
import DotLoader from '../components/DotLoader'

const MessageList = ({ messages, handleRetry }) => {
    const lastMessageRef = useRef(null);

    // Scroll to the last message
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            {messages.length > 0 ? (
                <h2 className={styles.chatTitle}>{messages[0].text}</h2>
            ) : (
                <h2 className={styles.chatTitle}>Welcome to the Chat</h2>
            )}
            <div className={styles.chatBox}>
                {messages.length === 0 ? (
                    <p className={styles.no_messages}>No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage} ${msg.hasError ? styles.no_answer : ''}`}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                            <div className={styles.messageContent}>
                                <strong>{msg.sender === 'user' ? 'User' : 'AI'}:</strong>
                                <div>
                                    {msg.sender === 'user' ? (
                                        // User's message
                                        <div>{typeof msg.text === 'string' && msg.text ? msg.text : 'Invalid message'}</div>
                                    ) : (
                                        // AI's response
                                        <>
                                            {msg.text === '...' ? (
                                                <DotLoader /> // Animation of points while waiting for the response
                                            ) : (
                                                <div>
                                                    {typeof msg.text === 'string' ? msg.text : 'Invalid message'} {/* Проверка типа */}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {msg.imageUrl && (
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={msg.imageUrl}
                                                alt="Generated by AI"
                                                className={styles.imagePreview}
                                                onError={(e) => {
                                                    e.target.src = '/photo_picture_icon.svg';  
                                                    e.target.style.width = '30px';  
                                                    e.target.style.alignSelf = 'end';  
                                                    e.target.nextElementSibling.style.display = 'none';  
                                                }}
                                            />
                                            <a href={msg.imageUrl} target="_blank" rel="noopener noreferrer" className={styles.imageLink}>
                                                View Image
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <small className={styles.timestamp}>
                                {msg.timestamp ? msg.timestamp.toLocaleString() : 'No date available'}
                            </small>
                            {msg.hasError && (
                                <button className={styles.retry_btn} onClick={() => handleRetry(index)}>
                                    &#10227;
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessageList;
