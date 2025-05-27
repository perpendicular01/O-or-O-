import React, { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxioSecure';

const MyRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5;

    useEffect(() => {
        const fetchDonationRequests = async () => {
            try {
                const response = await axiosSecure.get(`/donationRequests?email=${user?.email}&status=${statusFilter}`);
                setDonationRequests(response.data);
            } catch (error) {
                console.error('Error fetching donation requests:', error);
            }
        };

        fetchDonationRequests();
    }, [axiosSecure, user?.email, statusFilter]);

    const filteredRequests = donationRequests;

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto mt-8">
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
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Donor Info</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.recipientName}</td>
                                <td>{request.selectedDistrict}, {request.selectedUpazilas}</td>
                                <td>{request.donationDate} {request.donationTime}</td>
                                <td>{request.bloodGroup}</td>
                                <td>{request.donationStatus}</td>
                                <td>Donor Info</td>
                                <td>Actions</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="join">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`join-item btn ${currentPage === pageNumber ? 'btn-active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MyRequest;
