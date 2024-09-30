import { db } from '../firebase';  
import { collection, addDoc, getDocs, query, where, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';  

export const getUserThreads = async (userId) => {
    const q = query(collection(db, 'threads'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getThreadMessages = async (threadId) => {
    const threadDoc = await getDoc(doc(db, 'threads', threadId));

    if (threadDoc.exists()) {
        const threadData = threadDoc.data();
        return threadData.messages || [];
    } else {
        console.error('Thread not found');
        return [];
    }
};

export const createNewThread = async (userId) => {
    const docRef = await addDoc(collection(db, 'threads'), {
        userId,
        createdAt: new Date(),
        messages: []
    });
    return docRef;
};

export const updateThreadMessages = async (threadId, newMessages) => {
    try {
        const threadRef = doc(db, 'threads', threadId);
        await updateDoc(threadRef, {
            messages: newMessages
        });
    } catch (error) {
        console.error('Error updating messages:', error);
    }
};

export const deleteThread = async (threadId) => {
    try {
        const threadRef = doc(db, 'threads', threadId);
        await deleteDoc(threadRef);  
    } catch (error) {
        console.error('Error deleting thread:', error);
    }
};
