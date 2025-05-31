import React, { useState } from 'react';
import { BsCalendarHeartFill } from 'react-icons/bs';
import { FaCalendarAlt, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { MdCreateNewFolder, MdDashboard, MdEmail, MdHome, MdMenu, MdPayments, MdReviews } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
// import useCart from '../hooks/useCart';
import { TfiMenuAlt } from 'react-icons/tfi';
import { BiSolidFoodMenu } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useVolenteer from '../hooks/useVolenteer';
import useDonor from '../hooks/useDonor';
// import useAdmin from '../hooks/useAdmin';
import { FaArrowCircleRight } from "react-icons/fa";


import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const Dashboard = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isVolenteer] = useVolenteer();
    const [isDonor] = useDonor()
    console.log("is donor", isDonor)
    console.log("is volenteer", isVolenteer)
    console.log("is admin", isAdmin)

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await logOut()
            navigate('auth/login')
        }
        catch { /* empty */ }
    }

    const [isOpen, setIsOpen] = useState(false);


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div>
            <div className='flex'>
                {/* Sidebar Area */}
                <div className='relative lg:pl-5 w-[22%] min-h-screen hidden md:block   text-black'>
                    {/* <h2 className='mt-5 uppercase text-3xl mr-14 text-center font-bold'> dish</h2>
                    <h2 className='uppercase  text-3xl ml-10 text-center font-bold mb-7'> Dash</h2> */}
                    <div className='flex flex-col justify-center items-center mt-4 mb-8'>
                        <img src={logo} className="w-10 h-10" alt="" />
                        <h2 className='mt-1 uppercase text-md text-center font-bold text-redd '> O+orO- </h2>

                    </div>


                    {/* for donor */}
                    {
                        isDonor &&
                        <ul className='menu p-4  lg:space-y-2'>


                            <li>
                                <NavLink
                                    to="/dashboard"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdDashboard />
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
                                            <CgProfile />
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
                                            <MdCreateNewFolder />
                                        </div>
                                        <h2 className='uppercase text-md'> Create Request </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdHome />
                                        </div>
                                        <h2 className='uppercase text-md'> Home </h2>
                                    </div>
                                </NavLink>
                            </li>

                        </ul>
                    }


                    {/* for amdin */}
                    {
                        isAdmin &&
                        <ul className='menu p-4  lg:space-y-2'>


                            <li>
                                <NavLink
                                    to="/dashboard"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdDashboard />
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
                                            <CgProfile />
                                        </div>
                                        <h2 className=' text-md'> Profile </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/all-users"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <FaUsers  />
                                        </div>
                                        <h2 className=' text-md'> All Users </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/all-blood-donation-request"
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
                                        <h2 className='uppercase text-md'> Blood Request </h2>
                                    </div>
                                </NavLink>
                            </li>


                            <li>
                                <NavLink
                                    to="/dashboard/content-management"
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
                                        <h2 className='uppercase text-md'> Content Management </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdHome />
                                        </div>
                                        <h2 className='uppercase text-md'> Home </h2>
                                    </div>
                                </NavLink>
                            </li>


                        </ul>
                    }

                    {/* for volenteer */}
                    {
                        isVolenteer &&
                        <ul className='menu p-4  lg:space-y-2'>


                            <li>
                                <NavLink
                                    to="/dashboard"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdDashboard />
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
                                            <CgProfile />
                                        </div>
                                        <h2 className=' text-md'> Profile </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/all-blood-donation-request"
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
                                        <h2 className='uppercase text-md'> Blood Request </h2>
                                    </div>
                                </NavLink>
                            </li>


                            <li>
                                <NavLink
                                    to="/dashboard/content-management"
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
                                        <h2 className='uppercase text-md'> Content Management </h2>
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-redd text-white rounded-lg'
                                            : 'hover:bg-redd/50 rounded-lg'
                                    }
                                >
                                    <div className='flex items-center justify-center gap-2'>
                                        <div className='text-2xl'>
                                            <MdHome />
                                        </div>
                                        <h2 className='uppercase text-md'> Home </h2>
                                    </div>
                                </NavLink>
                            </li>

                        </ul>
                    }



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



                {/* for mbile device */}
                <div onClick={toggleDrawer} className='md:hidden text-redd z-10 ml-2 -mr-3 mt-36 '> <FaArrowCircleRight className='text-3xl  ' /> </div>
                <Drawer style={{ backgroundColor: '', width: '' }} open={isOpen} onClose={toggleDrawer} direction="left">
                    <div>
                        {/* <h2 className='mt-5 uppercase text-3xl mr-14 text-center font-bold'> dish</h2>
                            <h2 className='uppercase  text-3xl ml-10 text-center font-bold mb-7'> Dash</h2> */}
                        <div className='flex flex-col justify-center items-center mt-4 mb-8'>
                            <img src={logo} className="w-10 h-10" alt="" />
                            <h2 className='mt-1 uppercase text-md text-center font-bold text-redd '> O+orO- </h2>

                        </div>



                        {/* for donor */}
                        {
                            isDonor &&
                            <ul className='menu p-4  lg:space-y-2'>


                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        end
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdDashboard />
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
                                                <CgProfile />
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
                                                <MdCreateNewFolder />
                                            </div>
                                            <h2 className='uppercase text-md'> Create Request </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdHome />
                                            </div>
                                            <h2 className='uppercase text-md'> Home </h2>
                                        </div>
                                    </NavLink>
                                </li>


                            </ul>
                        }


                        {/* for amdin */}
                        {
                            isAdmin &&
                            <ul className='menu p-4  lg:space-y-2'>


                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        end
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdDashboard />
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
                                                <CgProfile />
                                            </div>
                                            <h2 className=' text-md'> Profile </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/all-users"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <FaUsers />
                                            </div>
                                            <h2 className=' text-md'> All Users </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/all-blood-donation-request"
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
                                            <h2 className='uppercase text-md'> Blood Request </h2>
                                        </div>
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink
                                        to="/dashboard/content-management"
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
                                            <h2 className='uppercase text-md'> Content Management </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdHome />
                                            </div>
                                            <h2 className='uppercase text-md'> Home </h2>
                                        </div>
                                    </NavLink>
                                </li>


                            </ul>
                        }

                        {/* for volenteer */}
                        {
                            isVolenteer &&
                            <ul className='menu p-4  lg:space-y-2'>


                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        end
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdDashboard />
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
                                                <CgProfile />
                                            </div>
                                            <h2 className=' text-md'> Profile </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/all-blood-donation-request"
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
                                            <h2 className='uppercase text-md'> Blood Request </h2>
                                        </div>
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink
                                        to="/dashboard/content-management"
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
                                            <h2 className='uppercase text-md'> Content Management </h2>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-redd text-white rounded-lg'
                                                : 'hover:bg-redd/50 rounded-lg'
                                        }
                                    >
                                        <div className='flex items-center justify-center gap-2'>
                                            <div className='text-2xl'>
                                                <MdHome />
                                            </div>
                                            <h2 className='uppercase text-md'> Home </h2>
                                        </div>
                                    </NavLink>
                                </li>


                            </ul>
                        }



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
                </Drawer>

                {/* Main Content Area */}
                <div className='flex-1 bg-gray-50'>
                    <Outlet></Outlet>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;
