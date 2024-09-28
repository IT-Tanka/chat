import { db } from '../firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, getDoc, updateDoc, doc } from 'firebase/firestore';


// export const createNewThread = async (userId) => {
//     return await addDoc(collection(db, 'threads'), {
//         userId,
//         createdAt: new Date(),
//         messages: []
//     });
// };

export const getUserThreads = async (userId) => {
    const q = query(collection(db, 'threads'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getThreadMessages = async (threadId) => {
    // Получаем документ с id threadId из коллекции threads
    const threadDoc = await getDoc(doc(db, 'threads', threadId));

    if (threadDoc.exists()) {
        const threadData = threadDoc.data();
        console.log('messages', threadData.messages); // Предполагается, что сообщения хранятся в массиве messages
        return threadData.messages || []; // Возвращаем массив сообщений, если он существует
    } else {
        console.error('Thread not found');
        return [];
    }
};

export const createNewThread = async (userId) => {
    console.log('userId', userId);
    const docRef = await addDoc(collection(db, 'threads'), {
        userId,
        createdAt: new Date(),
        messages: []
    });
    console.log('docRef', docRef);
    return docRef;
};

export const updateThreadMessages = async (threadId, newMessages) => {
    try {
        const threadRef = doc(db, 'threads', threadId);
        await updateDoc(threadRef, {
            messages: newMessages // Обновляем массив сообщений в базе данных
        });
    } catch (error) {
        console.error('Error updating messages:', error);
    }
};