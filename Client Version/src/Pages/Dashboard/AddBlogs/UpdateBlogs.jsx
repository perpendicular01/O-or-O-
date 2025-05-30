import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate, useLoaderData } from 'react-router-dom';
import useAxioSecure from '../../../hooks/useAxioSecure';


const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateBlogs = () => {
   
    const updatItems = useLoaderData();
    const {_id, authorEmail, authorName, title: defaultTitle, thumbnail: defaultThumbnail, content: defaultContent} = updatItems;
    const [content, setContent] = useState(defaultContent || '');
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const axioSecure = useAxioSecure();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: defaultTitle,
        }
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    

    const onSubmit = async (data) => {
        const blogInfo = {
            authorName: authorName,
            authorEmail: authorEmail,
            title: data.title || defaultTitle,
            thumbnail: selectedImage || defaultThumbnail, // now safe to use
            content: content,
            status: 'draft'
        };
        console.log(blogInfo)
    
        try {
            const blogRes = await axioSecure.put(`/blogs/${_id}`, blogInfo);
            if (blogRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Blog is updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
    
                reset();
                setContent('');
                navigate('/dashboard/content-management');
            }
        } catch (err) {
            console.error('Blog update failed:', err);
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
            } else {
                console.error("Image upload failed: ", res.data);
            }
        } catch (error) {
            console.error("Image upload error: ", error);
        }
    };
    

    return (
        <div className='w-full'>
            <h2 className="text-3xl font-semibold my-8 text-center">Update Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] mx-auto">
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="text-blackk mb-2">Blog Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        {...register("title")}
                        
                        className="input input-bordered w-full " />
                    
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="text-blackk mb-2">Thumbnail Image</span>
                    </label>  <br />
                    <input type="file"  {...register("image")} 
                    onChange={handleImageChange}
                    className="file-input w-full max-w-md" />
                    
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
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlogs;
