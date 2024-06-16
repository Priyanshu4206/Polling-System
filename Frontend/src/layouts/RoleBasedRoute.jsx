import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    return isAuthenticated && allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
};

export default RoleBasedRoute;
