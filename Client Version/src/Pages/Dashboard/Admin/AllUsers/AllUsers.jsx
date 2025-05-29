import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../../hooks/useAxioSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [axiosSecure]);

    console.log(users)

    const handleBlockUser = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/${id}`);
            if (res.data.modifiedCount > 0) {
                setUsers(users.map(user => user._id === id ? { ...user, isBlocked: true } : user));
                toast.success('User blocked successfully!', {
                    position: "top-right",
                    autoClose: 998,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('Failed to block user!', {
                position: "top-right",
                autoClose: 998,
                theme: "colored",
            });
        }
    };

    const handleUnblockUser = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/${id}`);
            if (res.data.modifiedCount > 0) {
                setUsers(users.map(user => user._id === id ? { ...user, isBlocked: false } : user));
                toast.success('User unblocked successfully!', {
                    position: "top-right",
                    autoClose: 998,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error unblocking user:', error);
            toast.error('Failed to unblock user!', {
                position: "top-right",
                autoClose: 998,
                theme: "colored",
            });
        }
    };

    const handleMakeVolunteer = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/volenteer/${id}`);
            if (res.data.modifiedCount > 0) {
                setUsers(users.map(user => user._id === id ? { ...user, role: 'volenteer' } : user));
                toast.success('User made volunteer successfully!', {
                    position: "top-right",
                    autoClose: 998,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error making volunteer:', error);
            toast.error('Failed to make user volunteer!', {
                position: "top-right",
                autoClose: 998,
                theme: "colored",
            });
        }
    };

    const handleMakeAdmin = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${id}`);
            if (res.data.modifiedCount > 0) {
                setUsers(users.map(user => user._id === id ? { ...user, role: 'admin' } : user));
                toast.success('User made admin successfully!', {
                    position: "top-right",
                    autoClose: 998,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error('Error making admin:', error);
            toast.error('Failed to make user admin!', {
                position: "top-right",
                autoClose: 998,
                theme: "colored",
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4 mt-2">
                <h2 className="text-2xl font-semibold">All Users</h2>
                <div>
                    <select className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Blocked</option>
                    </select>
                </div>
            </div>
            <div className='bg-white p-4'>
                <h2 className='text-xl font-medium mb-5'> Users </h2>
                <div className="overflow-x-auto bg-white ">
                    <table className="min-w-full  ">
                        <thead>
                            <tr className=" py-1">

                                <th className="  border-b-gray-100">Image</th>
                                <th className="  border-b-gray-100">Name</th>
                                <th className=" border-b-gray-100 pr-9">Email</th>
                                <th className="border-b-gray-100">Role</th>
                                <th className="border-b-gray-100">Status</th>
                                <th className="border-b-gray-100">Blood Group</th>
                                <th className="border-b-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 text-center border-b">

                                        <img src={user.image} alt="" className="w-8 h-8 rounded-full mr-2" />


                                    </td>
                                    <td className="py-3 px-5 text-center border-b">{user.name}</td>
                                    <td className="py-3 px-3 text-center  border-b">{user.email}</td>
                                    <td className="py-3 text-center border-b">{user.role}</td>
                                    <td className="py-3 px-7 text-center border-b">
                                        {
                                            user.isBlocked ?
                                                <span className="bg-red-100 rounded-full  px-2 py-1 text-red-800 font-medium">blocked</span> :
                                                <span className="bg-green-100 rounded-full  px-2 py-1 text-green-950 font-medium">active</span>
                                        }
                                    </td>
                                    <td className="py-3 px-4 text-center border-b">{user.group}</td>

                                    <td className="py-3 px-4 text-center border-b">
                                        <div className="flex flex-col justify-center items-center gap-2">

                                            {user.role === 'admin' && (
                                                <h2 className='text-sm font-medium'>Already Admin</h2>
                                            )}

                                            {user.role === 'donor' && (
                                                <>
                                                    {/* Block/Unblock only for donors */}
                                                    {user.isBlocked ? (
                                                        <button
                                                            onClick={() => handleUnblockUser(user._id)}
                                                           className="bg-green-800 font-medium text-white text-sm px-4 py-1 rounded-4xl"
                                                        >
                                                            Unblock
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleBlockUser(user._id)}
                                                            className="bg-red-700 text-white font-medium text-sm px-4 py-1 rounded-4xl"
                                                        >
                                                            Block
                                                        </button>
                                                    )}
                                                    <div className='flex flex-row gap-1'>
                                                        <button
                                                            onClick={() => handleMakeVolunteer(user._id)}
                                                            className='px-1 text-sm border rounded-2xl  text-black'>
                                                            Make Volunteer
                                                        </button>
                                                        <button
                                                            onClick={() => handleMakeAdmin(user._id)}
                                                            className=' border px-1 rounded-4xl text-sm  text-black'>
                                                            Make Admin
                                                        </button>
                                                    </div>


                                                </>
                                            )}

                                            {user.role === 'volenteer' && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className=' border px-1 rounded-4xl text-sm  text-black'>
                                                    Make Admin
                                                </button>
                                            )}

                                        </div>
                                    </td>




                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;
