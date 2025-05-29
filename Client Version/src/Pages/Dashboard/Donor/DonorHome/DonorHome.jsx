import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosSecure from '../../../../hooks/useAxioSecure';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SlCalender } from "react-icons/sl";

const DonorHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosSecure.get(`/donationRequests?email=${user?.email}`);
                const sortedRequests = response.data.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
                setDonationRequests(sortedRequests.slice(0, 3));
            } catch (error) {
                console.error('Error fetching donation requests:', error);
            }
        };

        fetchDonationRequests();
    }, [user?.email]);

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/donationRequests/${id}`, { donationStatus: status });
            if (response.data.modifiedCount > 0) {
                setDonationRequests(donationRequests.map(request =>
                    request._id === id ? { ...request, donationStatus: status } : request
                ));
                Swal.fire(
                    'Updated!',
                    `Donation request status has been updated to ${status}.`,
                    'success'
                )
            }
        } catch (error) {
            console.error("Error updating donation status:", error);
            Swal.fire(
                'Error!',
                'Failed to update the donation request status.',
                'error'
            );
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donationRequests/${id}`)
                    .then((response) => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Donation Request has been deleted.",
                                icon: "success"
                            });
                            setDonationRequests(donationRequests.filter(request => request._id !== id));
                        } else {
                            Swal.fire("Error!", "Failed to delete the request.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting request:", error);
                        Swal.fire("Error!", "Failed to delete the request.", "error");
                    });
            }
        });
    }

    return (
        <div className="mx-auto mt-3 p-5">
            <div className='bg-redd/80 text-white rounded-lg p-5'>
                <h2 className="text-2xl font-medium">
                    Welcome backk, {user?.displayName || 'Donor'}!
                </h2>
                <p className=''>
                    Thank you for being a life-saving donor. Your contributions make a difference in the people lives .
                </p>
            </div>

            <div className='flex items-center pt-8 pb-5 gap-2'>
                <div className='text-redd text-xl'>
                    <SlCalender />
                </div>
                <h2 className='text-xl font-medium'>Recent Donation Requests</h2>
            </div>

            {donationRequests.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className='text-center'>Recipient</th>
                                <th className='text-center'>Location</th>
                                <th className='text-center'>Date </th>
                                <th className='text-center'>Time</th>
                                <th className='text-center'>Blood Group</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Donor Info</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map((request) => (
                                <tr key={request._id}>
                                    <td className='text-center'>{request.recipientName}</td>
                                    <td className='text-center'>{request.selectedDistrict}, {request.selectedUpazilas}</td>
                                    <td className='text-center'>{request.donationDate} </td>
                                    <td className='text-center'>{request.donationTime} </td>
                                    <td className='text-center'>{request.bloodGroup}</td>
                                    <td className='text-center'>{request.donationStatus}</td>
                                    {request.donationStatus === 'inprogress' ? (
                                        <td className='text-center'>
                                            {user?.displayName}
                                            <br />
                                            {user?.email}
                                        </td>
                                    ) : (
                                        <td className='text-center'></td>
                                    )}
                                    <td>
                                        <div className='flex gap-2 justify-center items center'>
                                            {/* with go the details page */}
                                             {request.donationStatus === 'inprogress' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(request._id, 'done')}
                                                        className='border p-1 border-green-500 text-green-500 rounded-sm text-md'>
                                                        Done
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(request._id, 'canceled')}
                                                        className='border p-1 border-red-500 text-red-500 rounded-sm text-md'>
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            <Link to={`/donation-request/${request._id}`}>
                                                <button
                                                    className='border p-2 border-gray-300 rounded-sm text-green-700 font-medium text-base'>
                                                    <FaRegEye /></button>
                                            </Link>

                                            <Link to={`/dashboard/update-request/${request._id}`}>
                                                <button

                                                    className='border p-2 border-gray-300 rounded-sm text-blue-700 font-medium text-base'>
                                                    <FaRegEdit /></button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(request._id)}
                                                className='border p-2 border-gray-300 rounded-sm text-redd font-medium text-base'>
                                                <RiDeleteBin6Line /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-8 ml-10">
                        <Link to='/dashboard/my-donation-requests'>
                            <button
                                className="btn text-redd border-redd ">View My All Requests</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p>No donation requests found.</p>
            )}
        </div>
    );
};

export default DonorHome;
