// // import React, { useState } from 'react';
// // import { GoogleLogin } from '@react-oauth/google';
// // import axios from 'axios';

// // function LoginPage() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');

// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('/api/auth/login', { email, password });
// //             // Сохранение токена и перенаправление пользователя
// //         } catch (error) {
// //             console.error("Ошибка при логине", error);
// //         }
// //     };

// //     const handleGoogleLogin = async (token) => {
// //         try {
// //             const response = await axios.post('/api/auth/google', { token });
// //             // Сохранение токена и перенаправление пользователя
// //         } catch (error) {
// //             console.error("Ошибка Google входа", error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <form onSubmit={handleLogin}>
// //                 <input 
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Email"
// //                     required
// //                 />
// //                 <input
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder="Password"
// //                     required
// //                 />
// //                 <button type="submit">Login</button>
// //             </form>

// //             <GoogleLogin
// //                 onSuccess={(response) => handleGoogleLogin(response.credential)}
// //                 onError={() => console.error('Ошибка Google OAuth')}
// //             />
// //         </div>
// //     );
// // }

// // export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();  // Получаем функцию login из контекста
//     const navigate = useNavigate();  // Хук для навигации

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const userData = { email, password };  // Данные пользователя
//         login(userData, navigate);  // Передаем navigate в login
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//             />
//             <button type="submit">Login</button>
//             <Link to="/register">Register</Link>
//         </form>

//     );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); 
            navigate('/threads');
        } catch (error) {
            console.error("Ошибка при логине", error);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/threads');
        } catch (error) {
            console.error("Ошибка Google входа", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default LoginPage;

