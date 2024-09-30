import React, { useRef, useEffect } from 'react';
import styles from './MessageList.module.css';

const MessageList = ({ messages, handleRetry }) => {
    const lastMessageRef = useRef(null);

    // Прокрутка к последнему сообщению
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
                    <p>No messages yet</p>
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
                                    {msg.sender === 'ai' && msg.text === '...' ? (
                                        <span className={styles.dots}></span> // Анимация точек
                                    ) : (
                                        msg.text
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

