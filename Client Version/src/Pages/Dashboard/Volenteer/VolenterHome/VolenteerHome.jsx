import React, { useEffect, useState } from 'react';
import { FaUsers, FaDonate, FaTint } from 'react-icons/fa';
import useAxioSecure from '../../../../hooks/useAxioSecure';

const VolenteerHome = () => {
    const [users, setUsers] = useState([]);
    const [donationRequests, setDonationRequests] = useState([]);
    const axiosSecure = useAxioSecure()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axiosSecure.get('/donors');
                setUsers(usersResponse.data);

                const donationRequestsResponse = await axiosSecure.get('/allDonationRequests');
                setDonationRequests(donationRequestsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    console.log(donationRequests)

    return (
        <div className="container mx-auto p-4">
            <div className="bg-redd/80 text-white rounded-lg p-5">
                <h2 className="text-2xl font-medium">Welcome back, Volenteer!</h2>
                <p className="">Support the donation process and connect those in need with life-saving blood.</p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-5">
                {/* Total Users Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Users (Donors)</h3>
                            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                        </div>
                        <div className="text-5xl text-blue-500">
                            <FaUsers />
                        </div>
                    </div>
                    
                </div>

                {/* Total Funding Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Funding</h3>
                            <p className="text-3xl font-bold text-gray-900">$45,230</p>
                        </div>
                        <div className="text-5xl text-green-500">
                            <FaDonate />
                        </div>
                    </div>
                    
                </div>

                {/* Total Blood Donation Requests Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Blood Donation Requests</h3>
                            <p className="text-3xl font-bold text-gray-900">{donationRequests.length}</p>
                        </div>
                        <div className="text-5xl text-red-500">
                            <FaTint />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default VolenteerHome;


