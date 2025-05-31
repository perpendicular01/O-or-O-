import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }

    if (user && isAdmin) {
        return children;
    }
    logOut()
        .then(() => {
            // Sign-out successful.
            console.log('Sign out successful');
        }).catch(() => {
        });


    return <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
