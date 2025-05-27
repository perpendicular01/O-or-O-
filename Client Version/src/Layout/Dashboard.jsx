import React from 'react';
import { BsCalendarHeartFill } from 'react-icons/bs';
import { FaCalendarAlt, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { MdEmail, MdMenu, MdPayments, MdReviews } from 'react-icons/md';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
// import useCart from '../hooks/useCart';
import { TfiMenuAlt } from 'react-icons/tfi';
import { BiSolidFoodMenu } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';
// import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const {  logOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await logOut()
            navigate('/login')
        }
        catch { /* empty */ }
    }



    return (
        <div>
            <div className='flex'>
                {/* Sidebar Area */}
                <div className='relative lg:pl-5 w-[20%] min-h-screen   text-black'>
                    {/* <h2 className='mt-5 uppercase text-3xl mr-14 text-center font-bold'> dish</h2>
                    <h2 className='uppercase  text-3xl ml-10 text-center font-bold mb-7'> Dash</h2> */}
                    <div className='flex flex-col justify-center items-center mt-4 mb-8'>
                        <img src={logo} className="w-10 h-10" alt="" />
                        <h2 className='mt-1 uppercase text-md text-center font-bold text-redd '> O+orO- </h2>

                    </div>



                    <ul className='menu p-4  lg:space-y-2'>


                        <li>
                            <NavLink
                                to="/dashboard/donorHome"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-redd text-white rounded-lg'
                                        : 'hover:bg-redd/50 rounded-lg'
                                }
                            >
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='text-2xl'>
                                        <IoMdHome />
                                    </div>
                                    <h2 className=' text-md'> DashBoard </h2>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-redd text-white rounded-lg'
                                        : 'hover:bg-redd/50 rounded-lg'
                                }
                            >
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='text-2xl'>
                                        <FaUtensils />
                                    </div>
                                    <h2 className=' text-md'> Profile </h2>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-donation-requests"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-redd text-white rounded-lg'
                                        : 'hover:bg-redd/50 rounded-lg'
                                }
                            >
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='text-2xl'>
                                        <TfiMenuAlt />
                                    </div>
                                    <h2 className='uppercase text-md'> My Request</h2>
                                </div>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink
                                to="/dashboard/create-donation-request"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-redd text-white rounded-lg'
                                        : 'hover:bg-redd/50 rounded-lg'
                                }
                            >
                                <div className='flex items-center justify-center gap-2'>
                                    <div className='text-2xl'>
                                        <BiSolidFoodMenu />
                                    </div>
                                    <h2 className='uppercase text-md'> Create Request </h2>
                                </div>
                            </NavLink>
                        </li>

                    </ul>


                    <div className="absolute bottom-10 lg:pl-6  p-4">
                        <hr className="border-t-2 border-gray-400 my-4 w-full" />


                        <NavLink
                            to="/logout"
                            className=' text-black rounded-lg hover:bg-blue-100 absolute bottom-0'
                        >
                            <button
                            onClick={handleSignOut}
                            className='btn px-16 rounded-xl border-redd flex items-center gap-2'>
                                <h2 className='uppercase text-md'> Logout </h2>
                            </button>
                        </NavLink>
                    </div>

                </div>

                {/* Main Content Area */}
                <div className='flex-1 bg-gray-50'>
                    <Outlet></Outlet>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;
