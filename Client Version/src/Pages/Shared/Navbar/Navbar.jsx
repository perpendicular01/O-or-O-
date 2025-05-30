import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoIosMenu, IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import logo from '../../../assets/logo.png';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const path = useLocation().pathname;
    // console.log(path)
    const navigate = useNavigate();


    // links
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "font-bold text-redd" : "hover:font-semibold hover:text-redd/60 "}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/search"
                className={({ isActive }) => isActive ? "font-bold text-redd" : "hover:font-semibold hover:text-redd/60 "}
            >
                Search
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/blogs"
                className={({ isActive }) => isActive ? "font-bold text-redd" : "hover:font-semibold hover:text-redd/60"}
            >
                Blogs
            </NavLink>
        </li>
        <li>
            <NavLink
                to="blood-donation-requests"
                className={({ isActive }) => isActive ? "font-bold text-redd" : "hover:font-semibold hover:text-redd/60"}
            >
                Blood Request
            </NavLink>
        </li>
        <li>
            <NavLink
                to="dashboard"
                className={({ isActive }) => isActive ? "font-bold text-redd" : "hover:font-semibold hover:text-redd/60"}
            >
                Dashboard
            </NavLink>
        </li>



    </>

    const handleSignOut = async (e) => {
        e.preventDefault();

        try {
            await logOut()
            navigate('/login')
        }
        catch { /* empty */ }
    }

    return (

        <div className="navbar  max-w-screen-xl  flex justify-between items-center py-2 md:py-2 lg:py-3   text-blackk">
            {/* for small device only */}
            <div className="md:hidden">
                <div className="dropdown ">
                    <div tabIndex="0" role="button" className="text-3xl m-1"><IoIosMenu></IoIosMenu></div>
                    <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                        {links}
                    </ul>
                </div>
            </div>

            {/* left */}
            <div className="flex  items-center gap-3 ">
                <Link to="/">
                    <img className="w-8 h-8" src={logo} />
                </Link>
                <h2 className="text-lg font-bold "> <span className="text-redd">O+</span>or<span className="text-redd">O-</span></h2>
            </div>

            {/* for md middle */}
            <div className="hidden list-none md:flex items-center gap-5 text-sm ">
                {links}
            </div>



            <div className="flex items-center gap-2 md:gap-8 ">



                {
                    user ?
                        <div className="flex items-center gap-2 md:gap-4 ">
                            <div>
                                <img className="rounded-full w-9 h-9 lg:w-10 lg:h-10" src={user.photoURL} alt="" />
                            </div>
                            <div>
                                <Link>
                                    <button
                                        onClick={handleSignOut}
                                        className={`px-2 md:px-3 py-1 rounded-lg text-sm md:text-base font-medium ${path === 'login'
                                            ? 'text-white bg-redd hover:bg-redd/90'
                                            : 'bg-white border-redd border-[1px] text-redd hover:bg-redd hover:text-white'
                                            }`}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </div>

                        </div>
                        :
                        <div className="flex items-center gap-2 md:gap-4 ">
                            <div className="text-redd text-2xl">
                            <IoIosNotificationsOutline />
                            </div>
                            <Link to="login"><button className={`px-2 md:px-3 lg:px-3 py-1 lg:py-1 rounded-lg text-sm md:text-base  font-medium ${path === 'login' ? "text-white bg-redd hover:bg-redd/90" : "bg-redd/90 text-white"}`}>  Login </button></Link>
                            {/* <Link to="register">   <button className={`px-2 md:px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-sm md:text-base font-medium ${path === 'register' ? "text-white bg-[#4B5563] hover:bg-gray-700" : "bg-[#BAC2CA] text-black"}`}> Register </button></Link> */}
                        </div>
                }


            </div>
        </div>

    );
};

export default Navbar;



// <div>
//         <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</Link>
//         <Link to="/dashboard" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
//         <Link to="/contact" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Contact</Link>
//       </div>

