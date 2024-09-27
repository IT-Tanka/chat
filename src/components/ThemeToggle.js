import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css'; 
const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); 
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setTheme(currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, []);

    return (
        <div className={styles.themeToggle}>
            <input
                type="checkbox"
                className={styles.themeToggleCheckbox}
                id="theme-toggle-checkbox"
                checked={theme === 'dark'} 
                onChange={toggleTheme}
            />
            <label className={styles.themeToggleLabel} htmlFor="theme-toggle-checkbox">
                <span className={styles.themeToggleInner} />
                <span className={styles.themeToggleSwitch} />
            </label>
        </div>
    );
};

export default ThemeToggle;
