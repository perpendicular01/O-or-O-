import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    // const location = useLocation();

    // log in page a navbar thakbe kina
    // const noHeaderFooter = location.pathname.includes('login') || 
    //                         location.pathname.includes('register')
    return (
        <div className=''>
            {/* {
                noHeaderFooter ||  */}
                    <Navbar></Navbar>
            {/* } */}
            <Outlet></Outlet>
            {/* {
                noHeaderFooter ||  */}
                    <Footer></Footer>
            {/* } */}
        </div>
    );
};

export default Main;