import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { FaPlus } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxioSecure';
import { toast } from 'react-toastify';


const Request = () => {
    const { user } = useAuth();
    const [recipientName, setRecipientName] = useState('');
    
    const [hospitalName, setHospitalName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donationTime, setDonationTime] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const axiosSecure = useAxiosSecure();

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [selectedUpazilas, setSelectedUpazilas] = useState("");
    console.log(selectedUpazilas, selectedDistrict)

    
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
            requesterName: user?.displayName,
            requesterEmail: user?.email,
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

        try {
            const response = await axiosSecure.post('/donationRequests', donationRequest);
            console.log(response.data);
            toast.success('Donation request created successfully!');
            setError('');
            setRecipientName('');
            setSelectedDistrict('');
            setSelectedUpazilas('');
            setHospitalName('');
            setFullAddress('');
            setBloodGroup('');
            setDonationDate('');
            setDonationTime('');
            setRequestMessage('');
        } catch (error) {
            console.error('Error creating donation request:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Unauthorized access. Please log in again.');
                } else if (error.response.status === 403) {
                    toast.error('You are blocked from creating donation requests. Please contact the administrator.');
                } else {
                    toast.error('Failed to create donation request.');
                }
                setError('');
                setSuccessMessage('');
            } else {
                setError(error.message || 'Failed to create donation request.');
                setSuccessMessage('');
            }
        }
    };



    return (
        <div className="container mx-auto mt-8">
            <div className='flex ml-8 mb-7 items-center gap-2'>
                <div className='text-redd text-xl'>
                <FaPlus  />
                </div>
                <h2 className="text-2xl font-bold ">Create Donation Request</h2>
            </div>
            <div className="w-[90%] ml-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h3 className="text-xl font-semibold mb-4">New Blood Donation Request</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="requesterName">
                                Requester Name
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="requesterName"
                                type="text"
                                placeholder="John Doe"
                                value={user?.displayName || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="requesterEmail">
                                Requester Email
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="requesterEmail"
                                type="email"
                                placeholder="John Doe"
                                value={user?.email || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <h2 className='my-5 font-semibold text-lg'> Recipient Information</h2>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2" htmlFor="recipientName">
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
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="recipientDistrict">
                                Recipient District *
                            </label>
                            <select
                                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-blackk leading-tight focus:outline-none focus:shadow-outline"
                                id="recipientDistrict"
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                required
                            >
                                <option value="">Select District</option>
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
                                required
                            >
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-blackk text-sm font-medium mb-2" htmlFor="hospitalName">
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
                        <label className="block text-blackk text-sm font-medium mb-2" htmlFor="fullAddress">
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
                        <label className="block text-blackk text-sm font-medium mb-2" htmlFor="bloodGroup">
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
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="donationDate">
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
                            <label className="block text-blackk text-sm font-medium mb-2" htmlFor="donationTime">
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
                        <label className="block text-blackk text-sm font-medium mb-2" htmlFor="requestMessage">
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
                        Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Request;
