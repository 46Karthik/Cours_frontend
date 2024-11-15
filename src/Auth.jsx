import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

        const user_details = JSON.parse(localStorage.getItem('userdata'));
    if (user_details === null || user_details === undefined) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;