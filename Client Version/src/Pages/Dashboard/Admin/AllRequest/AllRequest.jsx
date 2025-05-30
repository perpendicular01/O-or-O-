import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxioSecure';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAdmin from '../../../../hooks/useAdmin';
import useVolenteer from '../../../../hooks/useVolenteer';

const AllRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAdmin] = useAdmin();


    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosSecure.get(`/allDonationRequests?status=${statusFilter}`);
                setDonationRequests(response.data);
            } catch (error) {
                console.error('Error fetching donation requests:', error);
            }
        };

        fetchDonationRequests();
    }, [axiosSecure, statusFilter]);

    const filteredRequests = donationRequests;

    const currentRequests = filteredRequests;

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/donationRequests/${id}`, { donationStatus: status });
            if (response.data.modifiedCount > 0) {
                setDonationRequests(donationRequests.map(request =>
                    request._id === id ? { ...request, donationStatus: status } : request
                ));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Updated!',
                    text: `Donation request status has been updated to ${status}.`,
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        } catch (error) {
            console.error("Error updating donation status:", error);
            toast.error('Failed to update donation request status.');
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
        <div className="container mx-auto mt-3 p-5">
            <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

            <div className="flex justify-end mb-4">
                <select
                    className="border rounded px-2 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

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
                        {currentRequests.map((request) => (
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
                                    <div className='flex gap-2 justify-center items-center'>
                                        {/* Only show Done/Cancel buttons if status is 'inprogress' */}
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
                                        <button
                                            className='border p-2 border-gray-300 rounded-sm text-green-700 font-medium text-base'>
                                            <FaRegEye />
                                        </button>


                                        {/* Show admin-only buttons */}
                                        {isAdmin && (
                                            <>


                                                <Link to={`/dashboard/update-request/${request._id}`}>
                                                    <button
                                                        className='border p-2 border-gray-300 rounded-sm text-blue-700 font-medium text-base'>
                                                        <FaRegEdit />
                                                    </button>
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(request._id)}
                                                    className='border p-2 border-gray-300 rounded-sm text-red-600 font-medium text-base'>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllRequest;
