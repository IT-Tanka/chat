import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessageToAI } from '../services/openAI';
import { getThreadMessages, updateThreadMessages } from '../services/firestore';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import DotLoader from '../components/DotLoader';
import styles from './ChatPage.module.css';

const ChatPage = () => {
    const { threadId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
                        hasError: false,
                    };
                });

                const lastUserMessageIndex = messagesWithTimestamp
                    .slice()
                    .reverse()
                    .findIndex((msg) => msg.sender === 'user');
                const lastUserMessage = messagesWithTimestamp[messagesWithTimestamp.length - 1 - lastUserMessageIndex];
                if (lastUserMessage && !messagesWithTimestamp.some((msg) => msg.sender === 'ai' && msg.timestamp > lastUserMessage.timestamp)) {
                    lastUserMessage.hasError = true;
                }

                setMessages(messagesWithTimestamp);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [threadId]);


    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const newMessage = {
                text: inputMessage,
                sender: 'user',
                timestamp: new Date(),
                hasError: false,
            };

            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setInputMessage('');

            await updateThreadMessages(threadId, updatedMessages);

            setLoading(true);

            // Add a temporary message with animated dots (preloader)
            const tempAiMessage = {
                text: <DotLoader />,
                sender: 'ai',
                timestamp: new Date(),
                hasError: false,
            };
            const messagesWithTempLoader = [...updatedMessages, tempAiMessage];
            setMessages(messagesWithTempLoader);

            try {
                const aiResponse = await sendMessageToAI(inputMessage);

                // Remove the temporary message and add the real response from the AI
                const aiMessage = {
                    text: aiResponse,
                    sender: 'ai',
                    timestamp: new Date(),
                    hasError: false,
                };
                const finalMessages = [...updatedMessages, aiMessage];
                setMessages(finalMessages);

                await updateThreadMessages(threadId, finalMessages);
            } catch (error) {
                console.error('Error sending message:', error);
                const failedMessageIndex = updatedMessages.length - 1;
                updatedMessages[failedMessageIndex].hasError = true;
                setMessages([...updatedMessages]);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleRetry = async (messageIndex) => {
        const messageToRetry = messages[messageIndex];
        if (messageToRetry) {
            messageToRetry.hasError = false;
            setMessages([...messages]);
            setLoading(true);
            try {
                const aiResponse = await sendMessageToAI(messageToRetry.text);
                const aiMessage = { text: aiResponse, sender: 'ai', timestamp: new Date(), hasError: false };
                const updatedMessages = [...messages, aiMessage];
                setMessages(updatedMessages);

                await updateThreadMessages(threadId, updatedMessages);
            } catch (error) {
                console.error('Error retrying message:', error);
                messageToRetry.hasError = true;
                setMessages([...messages]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={styles.chatContainer}>
            <MessageList messages={messages} handleRetry={handleRetry} />
            <MessageInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default ChatPage;
