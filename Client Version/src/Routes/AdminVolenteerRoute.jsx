import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useVolenteer from '../hooks/useVolenteer';


const AdminVolenteerRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const [isVoleenter, isVoleenterLoading] = useVolenteer()
    const location = useLocation()

    if(loading || isAdminLoading || isVoleenterLoading){
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if(user && (isAdmin || isVoleenter)){
        return children;
    }

    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
};
export default AdminVolenteerRoute;