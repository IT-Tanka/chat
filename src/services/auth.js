export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Логика обработки данных
        if (email === 'test@example.com' && password === 'password123') {
            return res.status(200).json({ token: 'dummy-token', user: { email } });
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
