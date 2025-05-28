import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxioSecure';
import { MdUpload } from 'react-icons/md';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);


    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    
    console.log(user)


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axiosSecure.get(`/users/profile/${user?.email}`);
                setProfileData(res.data);
                if (res.data) {
                    setName(res.data.name || '');
                    setBloodGroup(res.data.group || '');
                    setDistrict(res.data.district || '');
                    setUpazila(res.data.upazila || '');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (user?.email) fetchProfileData();
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        console.log(name, bloodGroup, district, upazila, selectedImage);
        try {
            
            const updatedProfile = {
                name: name,
                group: bloodGroup,
                district: district,
                upazila: upazila,
                image: selectedImage || profileData.image,
            };

            const res = await axiosSecure.patch(`/users/profile/${user?.email}`, updatedProfile);
            if (res.data.modifiedCount > 0) {
                const refresh = await axiosSecure.get(`/users/profile/${user?.email}`);
                setProfileData(refresh.data);
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };



    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        setImageFile(file);

        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (res.data.success) {
                setSelectedImage(res.data.data.display_url);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };
    

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                {isEditing ? (
                    <button onClick={handleSaveClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                ) : (
                    <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                )}
            </div>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={selectedImage || profileData.image}
                    alt="Profile"
                    className="rounded-full w-32 h-32 object-cover mb-2"
                />
                {isEditing && (
                    <div>
                        <label htmlFor="imageUpload" className="cursor-pointer bg-gray-50 px-3 py-1 rounded-md flex items-center gap-2">
                            <MdUpload />
                            Upload New Image
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                )}
            </div>

            <div className=" px-8 pt-6 pb-8 mb-4 w-[80%] mx-auto">
                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        className={`shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-blackk   ${isEditing ? '' : 'bg-gray-50'}`}
                    />
                </div>

                {/* Email (disabled) */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                    />
                    <p className="text-gray-600 text-xs italic">Email cannot be changed</p>
                </div>

                {/* Blood Group */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >Blood Group</label>
                    <input
                        id="bloodGroup"
                        type="text"
                        name="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        disabled={!isEditing}
                        className={`shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700  ${isEditing ? '' : 'bg-gray-50'}`}
                    />
                </div>

                {/* District */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
                    <input
                        id="district"
                        type="text"
                        name="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        disabled={!isEditing}
                        className={`shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-50'}`}
                    />
                </div>

                {/* Upazila */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >Upazila</label>
                    <input
                        id="upazila"
                        type="text"
                        name="upazila"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        disabled={!isEditing}
                        className={`shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 ${isEditing ? '' : 'bg-gray-50'}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
