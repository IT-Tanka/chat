export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json([
            { id: 1, title: "Conversation with AI", lastMessage: "Hello!", updatedAt: "2024-09-25T10:00:00Z" },
            { id: 2, title: "Another chat", lastMessage: "Hi!", updatedAt: "2024-09-24T15:30:00Z" }
        ]);
    } else if (req.method === 'POST') {
        res.status(201).json({ message: "Thread created!" });
    }
}
