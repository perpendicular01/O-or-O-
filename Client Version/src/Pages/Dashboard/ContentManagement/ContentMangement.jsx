import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxioSecure from '../../../hooks/useAxioSecure';
import Swal from 'sweetalert2';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import useAdmin from '../../../hooks/useAdmin';

const ContentMangement = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxioSecure()
    const [isAdmin] = useAdmin()

    useEffect(() => {
        axiosPublic.get('/blogs')
            .then(res => {
                if (filter === 'all') {
                    setBlogs(res.data);
                } else {
                    const filteredBlogs = res.data.filter(blog => blog.status === filter);
                    setBlogs(filteredBlogs);
                }
            })
            .catch(err => console.log(err))
    }, [axiosPublic, filter])

    const handlePublish = (id) => {
        axiosSecure.patch(`/blogs/${id}`, { status: 'published' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    const updatedBlogs = blogs.map(blog => {
                        if (blog._id === id) {
                            return { ...blog, status: 'published' }
                        }
                        return blog;
                    })
                    setBlogs(updatedBlogs);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Blog is published`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleUnpublish = (id) => {
        axiosSecure.patch(`/blogs/${id}`, { status: 'draft' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    const updatedBlogs = blogs.map(blog => {
                        if (blog._id === id) {
                            return { ...blog, status: 'draft' }
                        }
                        return blog;
                    })
                    setBlogs(updatedBlogs);

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Blog is drafted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/blogs/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remainingBlogs = blogs.filter(blog => blog._id !== id);
                            setBlogs(remainingBlogs);
                            Swal.fire({
                                title: "Deleted!",
                                text: "blogs has been deleted.",
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire("Error!", "Failed to delete the request.", "error");
                        }

                    })
                    .catch((error) => {
                        console.error("Error deleting request:", error);
                        Swal.fire("Error!", "Failed to delete the request.", "error");
                    });

            }
        })

    }



    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Content Management</h2>
                <div className="flex items-center">
                    <div className='text-2xl font-extrabold mr-2'>
                        <CiFilter></CiFilter>
                    </div>
                    <select
                        className="select select-bordered mr-4 w-32"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <Link to="/dashboard/content-management/add-blog" className="btn bg-redd text-white rounded-md">
                        + Add Blog
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {blogs.map(blog => (
                    <div key={blog._id} className="card bg-base-100 shadow-xl">
                        <figure className="w-full h-45 overflow-hidden">
                            <img
                                src={blog.thumbnail}
                                alt="Thumbnail"
                                className="w-full h-full object-contain"
                            />
                        </figure>


                        <div className="card-body">
                            <h2 className="card-title">{blog.title}
                                {/* <div className="badge badge-secondary"></div> */}
                                {
                                    blog.status === 'published' ?
                                        <span className=" badge bg-green-100 rounded-4xl font-semibold text-green-900 ml-2 -mt-3">Published</span>
                                        :
                                        <span className="badge bg-amber-200 rounded-4xl font-semibold text-orange-900 ml-2 -mt-3">Draft</span>
                                }
                            </h2>
                            <p className='text-base'>By {blog.authorName}</p>



                            <div className="card-actions flex items-center gap-3 mt-3">
                                <button className='flex gap-1 px-2 py-1 rounded-md items-center border border-gray-300'>
                                    <div className='text-lg'>
                                        <MdOutlineRemoveRedEye></MdOutlineRemoveRedEye>
                                    </div>
                                    <h2 className='font-medium'> View </h2>
                                </button>
                                <Link to={`/dashboard/content-management/update-blog/${blog._id}`}>
                                    <button className='flex gap-1 text-blue-500 px-2 py-1 rounded-md hover:bg-blue-200 hover:text-black items-center border border-blue-200'>
                                        <div className='text-lg'>
                                            <FaRegEdit />
                                        </div>
                                        <h2 className='font-medium'> Edit </h2>
                                    </button>
                                </Link>

                                {
                                    isAdmin &&
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className='flex gap-1 px-2 py-1 text-red-500 rounded-md items-center hover:bg-red-200 hover:text-black border border-red-100'>
                                        <div className='text-xl'>
                                            <MdOutlineDeleteOutline />
                                        </div>
                                        <h2 className='font-medium'> Delete </h2>
                                    </button>
                                }
                            </div >

                            {
                                isAdmin &&
                                (
                                    blog.status === 'draft' ?
                                        <div className='flex'>
                                            <button
                                                className="px-4 py-1   border text-start bg-green-800 text-white font-semibold rounded-md"
                                                onClick={() => handlePublish(blog._id)}>
                                                Publish</button>
                                        </div>
                                        :
                                        <div className='flex'>
                                            <button className="border  border-gray-400 px-2 py-1 rounded-md font-semibold text-md "
                                                onClick={() => handleUnpublish(blog._id)}>
                                                Unpublish</button>
                                        </div>
                                )
                            }
                        </div >
                    </div >

                ))}
            </div >
        </div >
    );
};

export default ContentMangement;
