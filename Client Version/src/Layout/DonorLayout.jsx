import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Sidebar from '../Pages/Shared/SharedComponent/Sidebar';

const DonorLayout = () => {
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='w-full'>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default DonorLayout;
