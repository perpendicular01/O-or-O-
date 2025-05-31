import React from 'react';
import banner from '../../../assets/Home/banner.jpg';
import { CiSearch } from 'react-icons/ci';
import { IoAddCircleSharp } from 'react-icons/io5';
import search from '../../../assets/Home/search.png';
import fund from '../../../assets/Home/fund.png';
import idea from '../../../assets/Home/idea.png';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const Home = () => {
    const user = useAuth();
    console.log('User:', user);

    return (
        <div className='pt-10'>
            {/* Banner Section */}
            <div
                className="w-full bg-cover bg-center bg-no-repeat min-h-[50vh] md:min-h-[70vh] "
                style={{ backgroundImage: `url(${banner})` }}
            >
                <h2 className='font-stylish text-base md:text-xl text-blackk/80 pt-5 md:pt-3 lg:pt-15 pl-6 md:pl-10'>One Donation Can Change a Life Forever</h2>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold pt-1 md:pt-3 pl-6 md:pl-10'>Give the Gift of <span className='text-redd font-bold'> Blood, </span>  </h3>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold  md:pt-1 pl-6 md:pl-10'> Save a Life Today</h3>

                {/* show in middle and large in small it hidden */}
                <div className=''>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2 pl-6 md:pl-10 lg:pl-20 pt-3 md:pt-10'>
                        {user.user?.email ? (
                            <button
                                className='btn px-2 py-0.5 md:px-3 md:py-1 rounded-full  bg-redd text-white flex justify-center items-center'
                                disabled
                            >
                                <div className='text-base'>
                                    <IoAddCircleSharp />
                                </div>
                                <h2 className='text-sm'>Join as Donnor</h2>
                            </button>
                        ) : (
                            <Link to="/auth/register">
                                <button className='btn px-2 py-0.5 md:px-3 md:py-1 rounded-full  bg-redd text-white flex justify-center items-center'>
                                    <div className='text-base'>
                                        <IoAddCircleSharp />
                                    </div>
                                    <h2 className='text-sm'>Join as Donnor</h2>
                                </button>
                            </Link>
                        )}
                        <Link to="/search">
                            <button className='btn px-2 md:px-3 md:py-1 rounded-full border-redd  text-redd flex justify-center items-center gap-1'>
                                <div className='text-base'>
                                    <CiSearch />
                                </div>
                                <h2 className='text-sm'>search donors</h2>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>



            {/* eatured Section */}
            <div className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl lg:text-5xl font-stylish font-semibold text-center text-redd mb-8">Our Features </h2>
                    <p className='border-b-[3px] border-redd rounded-4xl w-18 mx-auto  -mt-5 mb-10'></p>
                    <div className="w-full pl-10 md:pl-0 mx-auto lg:w-[80%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Featured Donation Request Card */}
                        <div className="card bg-redd/5 w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={search}
                                    alt="Shoes"
                                    className="rounded-xl w-20 h-20 " />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl">Search Donors Easily</h2>
                                <p className='text-sm  text-gray-600 w-[80%] mx-auto'>Find donors based on blood group, district with a few clicks.</p>

                            </div>
                        </div>
                        {/* Featured Donation Request Card */}
                        <div className="card bg-redd/5 w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={idea}
                                    alt=""
                                    className="rounded-xl w-20 h-20 " />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl">Educational Blogs</h2>
                                <p className='text-sm text-gray-600 w-[80%] mx-auto'>Discover the truth behind common blood donation misconceptions and donate with confidence.</p>

                            </div>
                        </div>
                        {/* Featured Donation Request Card */}
                        <div className="card bg-redd/5 w-80 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img
                                    src={fund}
                                    alt=""
                                    className="rounded-xl w-20 h-20 " />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl">Funding System</h2>
                                <p className='text-sm text-gray-600 w-[80%] mx-auto'>Support life-saving initiatives by securely donating funds to our verified blood donation programs.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="py-12 bg-base-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
                    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-xl bg-redd/5">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" rows="4"></textarea>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button className="btn bg-redd text-white px-28  rounded-md">Submit</button>
                            </div>
                        </form>
                        <div className="mt-4 text-center font-medium">
                            <p>Contact Number: 01630667162</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
