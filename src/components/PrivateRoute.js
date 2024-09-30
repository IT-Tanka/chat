import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);  
    useEffect(() => {
        if (user === null) {
            if (firstLoad) {
                const timer = setTimeout(() => {
                    setShouldRedirect(true);
                    setLoading(false);
                    setFirstLoad(false);  
                }, 100);  

                return () => clearTimeout(timer);  
            } else {
                setLoading(false);
                setShouldRedirect(true);
            }
        } else {
            setLoading(false);  
        }
    }, [user, firstLoad]);

    if (loading) {
        return <div>...</div>;
    }

    return shouldRedirect ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
