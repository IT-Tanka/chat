import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const isLoading = user === null; 

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return user ? children : <Navigate to="/login" />;
};


export default PrivateRoute;
