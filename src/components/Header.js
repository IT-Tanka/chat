import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { user, logout } = useAuth();  
    const navigate = useNavigate();  

    const handleLogout = async () => {
        await logout(); 
        navigate('/login'); 
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>
                    <div className={styles.logo}>
                        <img src="../logo.svg" width="50" alt="Logo" className="logo-image" />
                        {user && (
                            <Link to="/threads">
                                <span>Threads</span>
                            </Link>
                        )}
                    </div>
                    <div className={styles.btns}>
                        {user ? (  
                            <button onClick={handleLogout}>LogOut</button>  
                        ) : (
                            <Link to="/login">LogIn</Link>  
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
