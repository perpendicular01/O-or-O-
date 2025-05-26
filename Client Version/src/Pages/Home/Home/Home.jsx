import React from 'react';
import banner from '../../../assets/Home/banner.jpg';
import { CiSearch } from 'react-icons/ci';
import { IoAddCircleSharp } from 'react-icons/io5';

const Home = () => {
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
                        <button className='btn px-2 py-0.5 md:px-3 md:py-1 rounded-full  bg-redd text-white flex justify-center items-center'>
                            <div className='text-base'>
                                <IoAddCircleSharp />
                            </div>
                            <h2 className='text-sm'>Join as Donnor</h2>
                        </button>
                        <button className='btn px-2 md:px-3 md:py-1 rounded-full border-redd  text-redd flex justify-center items-center gap-1'>
                            <div className='text-base'>
                                <CiSearch />
                            </div>
                            <h2 className='text-sm'>search donors</h2>
                        </button>
                    </div>
                </div>
            </div>

            

            {/* eatured Section */}
            <div className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Donation Requests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Featured Donation Request Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img className="w-full h-56 object-cover" src="https://daisyui.com/images/stock/photo-1559703248-dca59908d2c6.jpg" alt="Donation Request" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Urgent Blood Needed</h3>
                                <p className="text-gray-600">A patient urgently needs O+ blood. Please come forward and donate.</p>
                                <button className="btn btn-primary mt-4">View Details</button>
                            </div>
                        </div>
                        {/* Featured Donation Request Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img className="w-full h-56 object-cover" src="https://daisyui.com/images/stock/photo-1559703248-dca59908d2c6.jpg" alt="Donation Request" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Blood Donation Camp</h3>
                                <p className="text-gray-600">Join our blood donation camp and help save lives.</p>
                                <button className="btn btn-primary mt-4">View Details</button>
                            </div>
                        </div>
                        {/* Featured Donation Request Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img className="w-full h-56 object-cover" src="https://daisyui.com/images/stock/photo-1559703248-dca59908d2c6.jpg" alt="Donation Request" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Donate Blood Today</h3>
                                <p className="text-gray-600">Your blood donation can give someone a second chance at life.</p>
                                <button className="btn btn-primary mt-4">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="py-12 bg-base-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
                    <div className="max-w-md mx-auto">
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
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message"></textarea>
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                        <div className="mt-4 text-center">
                            <p>Contact Number: 123-456-7890</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
