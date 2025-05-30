import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { RiErrorWarningLine } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa';

const BloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        // Fetch pending donation requests from the server
        axiosPublic.get('/donation-request?status=pending')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching donation requests:', error);
            });
    }, [axiosPublic]);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-stylish text-redd font-bold mb-2 text-center">Blood Donation Requests</h2>
            <p className='border-b-[3px] border-redd rounded-4xl w-18 mx-auto  -mt-1 mb-2'></p>
            <p className='text-lg  text-gray-400 mb-8 text-center'>Help save lives by responding to blood donation requests</p>


            <div className='bg-redd/5 py-5 px-10 border border-redd rounded-lg mb-10 mx-2'>
                <div className='flex items-center gap-2'>
                    <div className='text-red-600 text-xl'>
                        <RiErrorWarningLine />
                    </div>
                    <h2 className='text-red-800 font-semibold text-lg'>Emergency Blood Requests</h2>
                </div>
                <p className="text-base text-red-700">
                    These patients are in need of blood. Your donation can save lives — please consider responding if you're eligible to donate.
                </p>
                <p className="text-sm mt-2 text-red-700">
                    🔒 <span className="font-medium text-red-800 font-semibold">Note:</span> You must be
                    l   logged in
                    to respond to donation requests.
                </p>
            </div>
            <div className="w-full pl-12 md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map(request => (
                    <div key={request._id} className="bg-white rounded-lg border border-gray-300 p-5 w-[300px] lg:w-[350px]">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-xl font-bold mb-1"> {request.recipientName}</h3>
                            <p className="text-sm font-bold text-red-800 border px-3 py-1 bg-red-50 rounded-full mb-1">{request.bloodGroup}</p>
                        </div>


                        <h3 className="text-sm font-medium text-gray-600 mb-2"> {request.hospitalName}</h3>
                        <div className='border-b border-b-gray-300 px-2 mb-3'></div>
                        <div className='flex items-center gap-2'>
                            <div>
                                <IoLocationOutline />
                            </div>
                            <h3 className="text-sm  text-gray-500 "> {request.selectedUpazilas} {request.selectedDistrict}</h3>
                        </div>


                        <div className='flex items-center gap-2'>
                            <div className='text-gray-600'>
                                <MdOutlineDateRange />
                            </div>
                            <h3 className="text-sm  text-gray-500 "> {request.donationDate} </h3>
                        </div>


                        <div className='flex items-center gap-2'>
                            <div className='text-gray-600'>
                                <FaRegClock />
                            </div>
                            <h3 className="text-sm  text-gray-500 "> {request.donationTime} </h3>
                        </div>

                        <div className='border-b border-b-gray-300 px-2 my-3'></div>



                        <Link to={`/blood-donation-requests/${request._id}`} >
                            <button className="flex justify-start items-center  gap-1  bg-red-600 hover:bg-red-900 text-white py-1 px-3 rounded-lg">
                                <div className='text-lg'>
                                <MdOutlineRemoveRedEye />
                                </div>
                                <h2 className='text-sm'> View Details </h2>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BloodDonationRequests;
