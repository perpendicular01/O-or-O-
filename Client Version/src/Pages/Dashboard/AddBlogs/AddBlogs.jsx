import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddBlogs = () => {
    const {user} = useAuth()
    console.log(user)
    const [content, setContent] = useState('');
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    

    const onSubmit = async (data) => {
        
        const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
        if (res.data.success) {
            const blogInfo = {
                authorName : user?.displayName,
                authorEmail : user?.email,
                title: data.title,
                thumbnail: res.data.data.url,
                content: content,
                status: 'draft'
            }
            const blogRes = await axiosPublic.post('/blogs', blogInfo);
            if (blogRes.data.insertedId) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Blog is created successfully`,
                    showConfirmButton: false,
                    timer: 1500
                })
                
                reset();
                setContent('');
                navigate('/dashboard/content-management')
            }
        }
    };

    return (
        <div className='w-full'>
            <h2 className="text-3xl font-semibold my-8 text-center">Add A Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] mx-auto">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="text-blackk mb-2">Blog Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        {...register("title", { required: true })}
                        required
                        className="input input-bordered w-full " />
                    {errors.title && <span className="text-red-500">Title is required</span>}
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="text-blackk mb-2">Thumbnail Image</span>
                    </label>  <br />
                    <input type="file"  {...register("image", { required: true })} className="file-input w-full max-w-md" />
                    {errors.image && <span className="text-red-500">Image is required</span>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="text-blackk mb-2">Blog Content</span>
                    </label>
                    <JoditEditor
                        value={content}
                        config={{
                            readonly: false,
                            placeholder: 'Start typings here...'
                        }}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={() => { }}
                    />
                </div>

                <button className="btn text-redd text-base border-redd px-20 mt-4">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlogs;
