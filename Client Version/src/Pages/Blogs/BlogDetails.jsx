import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
            })
            .catch(err => console.log(err))
    }, [axiosPublic, id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="card bg-base-100 shadow-xl">
                <figure className="w-full h-96 overflow-hidden">
                    <img
                        src={blog.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-contain"
                    />
                </figure>
                <div className="card-body">
                    <h2 className=" text-2xl font-stylish text-redd text-center">{blog.title}</h2>
                    <p className="text-gray-500 text-base text-center -mt-2 mb-2 font-medium">By {blog.authorName}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <div className='flex justify-end'>
                    <Link to="/blogs" className="text-white bg-redd/80 hover:bg-red-950 my-3 px-6 py-1 rounded-md ">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
