import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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
    // const q = query(collection(db, 'messages'), where('threadId', '==', threadId));
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map((doc) => doc.data());
    const querySnapshot = await getDocs(collection(db, "threads"));
    const threads = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt?.toDate() 
        };
    });
    return threads;
};
export const createNewThread = async (userId) => {
    console.log('userId',userId);
    const docRef = await addDoc(collection(db, 'threads'), {
        userId,
        createdAt: new Date(),
        messages: []
    });
    console.log('docRef', docRef);
    return docRef; 
};
