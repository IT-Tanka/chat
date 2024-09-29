import React, { useEffect, useState } from 'react';
import { getUserThreads, createNewThread } from '../services/firestore';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ThreadsListPage.module.css'; // Импортируем стили

function ThreadsListPage() {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await getUserThreads(user.uid);
                setThreads(response);
            } catch (error) {
                setError("Error loading threads");
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();
    }, [user]);

    const handleNewConversation = async () => {
        try {
            const newThread = await createNewThread(user.uid);
            navigate(`/threads/${newThread.id}`);
        } catch (error) {
            console.error('Error creating new thread:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Your Conversations</h2>
            <ul className={styles.threadsList}>
                {threads.length > 0 ? (
                    threads.map((thread) => (
                        <li key={thread.id} className={styles.threadItem}>
                            <Link to={`/threads/${thread.id}`} className={styles.threadLink}>
                                {thread.messages.length > 0 ? thread.messages[0].text : "No messages"}
                            </Link>
                            <div className={styles.threadInfo}>
                                {thread['createdAt'] || thread[' createdAt'] ? 
                                    (thread['createdAt'] || thread[' createdAt']).toDate().toLocaleString() :
                                    "No date"}
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No conversations yet.</p>
                )}
            </ul>
            <button onClick={handleNewConversation}>
                Start new conversation
            </button>
        </div>
    );
}

export default ThreadsListPage;
