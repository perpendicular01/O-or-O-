import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/blogs/status')
            .then(res => {
                setBlogs(res.data);
            })
            .catch(err => console.log(err))
    }, [axiosPublic])

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-stylish text-redd font-bold mb-2 text-center">Blood Donation Blog</h2>
            <p className='border-b-[3px] border-redd rounded-4xl w-18 mx-auto  -mt-1 mb-2'></p>
            <p className='text-lg  text-gray-400 mb-8 text-center'>Stay informed with the latest news, tips, and stories about blood donation</p>
            <div className="w-full pl-10 md:pl-0 md:w-[90%]  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map(blog => (
                    <div key={blog._id} className="card bg-gray-100 w-[320px] lg:w-[340px] shadow-lg">
                        <figure className="w-full h-48 overflow-hidden">
                            <img
                                src={blog.thumbnail}
                                alt="Thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p className="text-base text-gray-600 font-stylish -mt-1">By {blog.authorName}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/blog/${blog._id}`} className="text-white bg-redd/80 hover:bg-red-950  px-3 py-1 rounded-md ">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
