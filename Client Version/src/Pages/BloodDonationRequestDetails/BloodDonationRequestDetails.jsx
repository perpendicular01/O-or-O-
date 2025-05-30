import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useAxioSecure from '../../hooks/useAxioSecure';
import Swal from 'sweetalert2';

const BloodDonationRequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxioSecure();
    const { user, loading } = useAuth();
    const [request, setRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!user && !loading) {
            navigate('/login');
            return;
        }

        axiosSecure.get(`/donation-requests/${id}`)
            .then(response => {
                setRequest(response.data);
            })
            .catch(error => {
                console.error('Error fetching donation request details:', error);
            });
    }, [id, axiosSecure, navigate, user, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDonation = () => {
        axiosSecure.patch(`/donation-requests/${id}`, { status: 'inprogress' })
            .then(response => {
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Confirmed!',
                    text: 'You have confirmed to donate blood for this request.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/dashboard/my-donations'); // Optional: Navigate user to their donation history
                });
            })
            .catch(error => {
                console.error('Error updating donation status:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something went wrong. Please try again later.',
                });
            });
    };
    

    if (!request) {
        return <div>Loading request details...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-stylish text-redd font-bold mb-2 text-center">Donation Request Details</h2>
            <p className='border-b-[3px] border-redd rounded-4xl w-18 mx-auto  -mt-1 mb-2'></p>
            <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">Recipient: {request.recipientName}</h3>
                <p className="text-gray-600 mb-1">Location: {request.fullAddress}</p>
                <p className="text-gray-600 mb-1">Upazila: {request.selectedUpazilas}</p>
                <p className="text-gray-600 mb-1">District: {request.selectedDistrict}</p>
                <p className="text-gray-600 mb-1">Blood Group: {request.bloodGroup}</p>
                <p className="text-gray-600 mb-1">Date: {request.donationDate}</p>
                <p className="text-gray-600 mb-1">Time: {request.donationTime}</p>
                <p className="text-gray-600 mb-2">Additional Information: {request.requestMessage}</p>
            </div>

            <button onClick={openModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                Donate
            </button>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl transform transition-all inline-block align-middle max-w-lg w-full p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Confirm Donation</h3>
                            <div className="mt-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donorName">
                                        Donor Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donorName"
                                        type="text"
                                        placeholder="Donor Name"
                                        value={user.displayName}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donorEmail">
                                        Donor Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donorEmail"
                                        type="email"
                                        placeholder="Donor Email"
                                        value={user.email}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button onClick={closeModal} className="bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded mr-2">
                                    Cancel
                                </button>
                                <button onClick={handleConfirmDonation} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloodDonationRequestDetails;
