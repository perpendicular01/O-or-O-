import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';

import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxioSecure'
import Swal from 'sweetalert2';

const UpdateRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const requestItem = useLoaderData();
    const { _id, requesterName, requesterEmail, recipientName: initialRecipientName, selectedDistrict: initialSelectedDistrict,
        selectedUpazilas: initialSelectedUpazilas, hospitalName: initialHospitalName, fullAddress: initialFullAddress,
        donationDate: initialDonationDate, donationTime: initialDonationTime, requestMessage: initialRequestMessage,
        bloodGroup: initialBloodGroup } = requestItem;

    const [recipientName, setRecipientName] = useState(initialRecipientName || '');
    const [hospitalName, setHospitalName] = useState(initialHospitalName || '');
    const [fullAddress, setFullAddress] = useState(initialFullAddress || '');
    const [bloodGroup, setBloodGroup] = useState(initialBloodGroup || '');
    const [donationDate, setDonationDate] = useState(initialDonationDate || '');
    const [donationTime, setDonationTime] = useState(initialDonationTime || '');
    const [requestMessage, setRequestMessage] = useState(initialRequestMessage || '');


    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(initialSelectedDistrict || "");
    const [upazilas, setUpazilas] = useState([]);
    const [selectedUpazilas, setSelectedUpazilas] = useState(initialSelectedUpazilas || "");
    const navigate = useNavigate();
    // console.log(selectedUpazilas, selectedDistrict)


    useEffect(() => {
        fetch("https://bdapi.editboxpro.com/api/districts")
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(err => console.error("Failed to fetch divisions", err));
    }, []);



    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://bdapi.editboxpro.com/api/upazilas/${selectedDistrict.toLowerCase()}`)
                .then(res => res.json())
                .then(data => setUpazilas(data))
                .catch(err => console.error("Failed to fetch upazilas", err));
        } else {
            setUpazilas([]);
        }
    }, [selectedDistrict]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user?.isBlocked) {
            setError('You are blocked from creating donation requests.');
            return;
        }



        const donationRequest = {
            requesterName: requesterName,
            requesterEmail: requesterEmail,
            recipientName,
            selectedDistrict,
            selectedUpazilas,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            donationStatus: 'pending',
        };
        console.log(donationRequest);

        try {
            const response = await axiosSecure.put(`/donationRequests/${_id}`, donationRequest);
            console.log(response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Donation Request Updated",
                showConfirmButton: false,
                timer: 1500
              });
            setError('');
            setSuccessMessage('Donation request updated successfully!');
            navigate('/dashboard/my-donation-requests');
        } catch (error) {
            console.error('Error creating donation request:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Unauthorized access. Please log in again.');
                } else if (error.response.status === 403) {
                    toast.error('You are blocked from creating donation requests. Please contact the administrator.');
                } else {
                    toast.error('Failed to update donation request.');
                }
                setError('');
                setSuccessMessage('');
            } else {
                setError(error.message || 'Failed to update donation request.');
                setSuccessMessage('');
            }
        }
    };



    return (
        <div className="container mx-auto mt-8">
            <div className='flex ml-8 mb-7 items-center gap-2'>
                <div className='text-redd text-xl'>
                    <FaPlus />
                </div>
                <h2 className="text-2xl font-bold ">Update Donation Request</h2>
            </div>
            <div className="w-[90%] ml-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h3 className="text-xl font-semibold mb-4">Update Blood Donation Request</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" >
                                Requester Name
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="requesterName"
                                type="text"
                                placeholder="John Doe"
                                value={requesterName}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" >
                                Requester Email
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="requesterEmail"
                                type="email"
                                placeholder="John Doe"
                                value={requesterEmail}
                                readOnly
                            />
                        </div>
                    </div>

                    <h2 className='my-5 font-semibold text-lg'> Recipient Information</h2>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2">
                            Recipient Name *
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                            id="recipientName"
                            type="text"
                            placeholder="Enter recipient's full name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" >
                                Recipient District *
                            </label>
                            <select
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="recipientDistrict"
                                onChange={(e) => setSelectedDistrict(e.target.value)}

                            >
                                <option value="">{initialSelectedDistrict}</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.name.toLowerCase()}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="recipientUpazila">
                                Recipient Upazila *
                            </label>
                            <select
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="recipientUpazila"
                                onChange={(e) => setSelectedUpazilas(e.target.value)}

                            >
                                <option value="">{initialSelectedUpazilas}</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2">
                            Hospital Name *
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                            id="hospitalName"
                            type="text"
                            placeholder="e.g., Dhaka Medical College Hospital"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2" >
                            Full Address *
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                            id="fullAddress"
                            type="text"
                            placeholder="e.g., Zahir Raihan Rd, Dhaka"
                            value={fullAddress}
                            onChange={(e) => setFullAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2" >
                            Blood Group *
                        </label>
                        <select
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                            id="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                        >
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2">
                                Donation Date
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="donationDate"
                                type="date"
                                value={donationDate}
                                onChange={(e) => setDonationDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2">
                                Donation Time
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="donationTime"
                                type="time"
                                value={donationTime}
                                onChange={(e) => setDonationTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-blackk text-sm font-medium mb-2" >
                            Request Message
                        </label>
                        <textarea
                            className="shadow appearance-none border  border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                            id="requestMessage"
                            placeholder="Write why you need blood in details"
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRequest;
