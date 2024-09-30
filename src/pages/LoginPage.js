import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const savedEmail = localStorage.getItem('userEmail');
        const savedPassword = localStorage.getItem('userPassword');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
        if (savedPassword) {
            setPassword(savedPassword);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Enter a valid email.");
            return;
        }

        try {
            const userCredential = await login(email, password, rememberMe);
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password); 
            } else {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userPassword');
            }
            navigate('/threads');
        } catch (error) {
            setError("User not found. Please register.");
            console.error("Login error", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password); 
            } else {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userPassword');
            }
            await loginWithGoogle();
            navigate('/threads');
        } catch (error) {
            setError("Google login failed. Try again.");
            console.error("Google login error", error);
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
                
                <div className={styles.btns}>
                {error && <p className={styles.error}>{error}</p>}
                <div>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                </div>
                    <button type="submit">Login</button>
                <button type="button" onClick={handleGoogleLogin}>Login with Google</button></div>
                
                <Link className={styles.register_link} to="/register">Register</Link>
            </form>
        </div>
    );
};

export default LoginPage;
