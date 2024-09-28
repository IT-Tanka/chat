import React, { useEffect, useState } from 'react';
import { getUserThreads, createNewThread } from '../services/firestore'; // Импортируйте createNewThread
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

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
                setError("Error loading streams");
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();
    }, [user]);

    const handleNewConversation = async () => {
        try {
            console.log('user.uid', user.uid);
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
            <h1>Your Conversations</h1>
            <ul>
                {threads.length > 0 ? (
                    threads.map((thread) => (
                        <li key={thread.id}>
                            <Link to={`/threads/${thread.id}`}>
                                {thread.messages.length > 0 ? thread.messages[0].text : "No messages"} - 
                                {thread['createdAt'] || thread[' createdAt'] ? 
                                    (thread['createdAt'] || thread[' createdAt']).toDate().toLocaleString() :
                                    "No date"}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No conversations yet.</p>
                )}
            </ul>
            <button onClick={handleNewConversation}>Start new conversation</button>
        </div>
    );
}

export default ThreadsListPage;
