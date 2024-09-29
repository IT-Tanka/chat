import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './RegisterPage.module.css';


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isPasswordStrong = (password) => {
        return password.length >= 6 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if any fields are empty
        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
        }

        // Check password strength
        if (!isPasswordStrong(password)) {
            setError("Password must be at least 6 characters long and contain  letters and   numbers.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Attempt to register the user with provided email and password
            await register(email, password);
            navigate('/threads');
        } catch (error) {
            setError("Registration error. An account with this email address may already exist.");
            console.error("Registration error", error);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            // Attempt to register the user via Google authentication
            await loginWithGoogle();
            navigate('/threads');
        } catch (error) {
            setError("Error registering with Google.");
            console.error("Error registering with Google", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />

                <div className={styles.btns}>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Register</button>
                    <button type="button" onClick={handleGoogleRegister} className={styles.google_register_btn}>Register with Google</button>
                </div>
                <Link to="/login" className={styles.login_link}>Login</Link>
            </form>
        </div>
    );
};

export default RegisterPage;
