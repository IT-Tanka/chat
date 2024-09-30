import React from 'react';
import styles from './MessageInput.module.css';

const MessageInput = ({ inputMessage, setInputMessage, handleSendMessage }) => {
    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className={styles.inputContainer}>
            <textarea
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                rows={1}
                className={styles.messageInput}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;
