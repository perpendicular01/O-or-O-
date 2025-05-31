import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
            navigate('auth/login');
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

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleConfirmDonation = () => {
        const payload = {
            status: 'inprogress',
            donorName: user.displayName,
            donorEmail: user.email
        };

        axiosSecure.patch(`/donation-requests/${id}`, payload)
            .then(() => {
                closeModal();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: 'You have confirmed to donate blood for this request.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/blood-donation-requests');
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



    if (!request) return <div>Loading request details...</div>;

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-stylish text-redd font-bold mb-2 text-center">Donation Request Details</h2>
            <p className='border-b-[3px] border-redd rounded-4xl w-18 mx-auto -mt-1 mb-2'></p>
            <div className="bg-gray-50 rounded-lg shadow-xl p-8 border border-gray-300">
                <div className='flex justify-between items-center'>
                    <h3 className="text-2xl font-bold text-black mb-6">Recipient: <span className='text-red-700'> {request.recipientName} </span></h3>
                    <p className="text-white mb-3 border border-redd font-medium rounded-full px-3 py-1 bg-redd/80">  {request.donationStatus}</p>
                </div>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Hospital:</span> <span className='text-red-600 font-medium'>{request.hospitalName}</span></p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Location:</span> {request.fullAddress}</p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Upazila:</span> {request.selectedUpazilas}</p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">District:</span> {request.selectedDistrict}</p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Blood Group:</span> <span className='text-red-800 font-semibold'> {request.bloodGroup}</span></p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Date:</span> {request.donationDate}</p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Time:</span> {request.donationTime}</p>
                <p className="text-gray-800 mb-3"><span className="font-semibold">Additional Information:</span> {request.requestMessage}</p>
            </div>

            <button
                onClick={openModal}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Donate
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 z-40"></div>

                    {/* Modal content */}
                    <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900">Confirm Donation</h3>
                        <div className="mt-2">
                            <div className="mb-4">
                                <label htmlFor="donorName" className="block text-gray-700 text-sm font-bold mb-2">
                                    Donor Name
                                </label>
                                <input
                                    id="donorName"
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="donorEmail" className="block text-gray-700 text-sm font-bold mb-2">
                                    Donor Email
                                </label>
                                <input
                                    id="donorEmail"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDonation}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloodDonationRequestDetails;
