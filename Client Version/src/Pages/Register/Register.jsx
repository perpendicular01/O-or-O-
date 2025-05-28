import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import { FaEye, FaEyeSlash, FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";

import { useForm } from "react-hook-form"
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Register = () => {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [selectedUpazilas, setSelectedUpazilas] = useState("");
    console.log(selectedUpazilas, selectedDistrict)


    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);

    const axiosPublic = useAxiosPublic()


    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)
    const from = location.state?.from?.pathname || '/'

    const {
        register,
        handleSubmit,
        reset,
        watch,  // this for password matching
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            const imageFile = { image: data.image[0] };
            const res1 = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            if (res1.data.success) {
                await updateUserProfile(data.name, res1.data.data.display_url);

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    group: data.group,
                    district: data.district,
                    upazila: data.upazila,
                    image: res1.data.data.display_url,
                    role: "donor",
                    isBlocked: false,
                    firebaseUid: loggedUser.uid
                };

                const res2 = await axiosPublic.post("/users", userInfo);
                if (res2.data.insertedId) {
                    Swal.fire({
                        title: "Successfully registered",
                        icon: "success"
                    });
                    reset();
                    navigate(from, { replace: true });
                }
            }

        } catch (error) {
            console.error("Registration error", error);
        }
    };



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




    return (
        <div
            className=" mb-10 mt-2 flex items-center justify-center "

        >


            {/* Login Form Section */}
            <div className="w-[90%] mx-auto  md:w-full  bg-redd/5 py-10  rounded-lg shadow-[10px_10px_20px_rgba(0,0,0,0.9)]">
                <p className="font-stylish text-redd font-bold  text-3xl pb-5 text-center">SignUp</p>
                <p className='border-t-2 w-8 mx-auto -mt-3 text-redd mb-6'></p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 md:px-0 md:w-[60%] mx-auto">

                    <div className='md:flex items-center gap-10'>
                        {/* name */}
                        <div className="mb-5 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">Full Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="input input-bordered w-full"

                            />
                            {errors.name && <span className='mt-1 text-red-800'>name is required</span>}
                        </div>

                        {/* blood grop */}
                        <div className="mb-5 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">Blood Group </span>
                            </label>
                            <select defaultValue="Blood Group"
                                {...register("group", { required: true })}
                                className="select w-full text-gray-700" >
                                <option disabled={true}>Blood Group</option>
                                <option value="a+"> A+ </option>
                                <option value="a-"> A- </option>
                                <option value="b+"> B+</option>
                                <option value="b-"> B-</option>
                                <option value="ab+"> AB+ </option>
                                <option value="b-"> AB- </option>
                                <option value="o+"> O+ </option>
                                <option value="o-"> O- </option>
                            </select>

                        </div>
                    </div>

                    {/* email */}
                    <div className="mb-5">
                        <label className="label">
                            <span className="label-text font-semibold text-blackk/90 mb-1">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered w-full"

                        />
                        {errors.email && <span className='mt-1 text-red-800'>Email is required</span>}
                    </div>




                    {/* location */}
                    <div className='md:flex items-center gap-10'>
                        {/* district */}
                        <div className="mb-5 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">District</span>
                            </label>
                            <select
                                defaultValue="select district"
                                {...register("district", { required: true })}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="select w-full text-gray-700"
                                disabled={!districts.length}
                            >
                                <option value="">Select District</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.name.toLowerCase()}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="mb-5 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">Upazila</span>
                            </label>
                            <select
                                {...register("upazila", { required: true })}
                                onChange={(e) => setSelectedUpazilas(e.target.value)}
                                className="select w-full text-gray-700"
                                disabled={!upazilas.length}
                            >
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <div className='md:flex items-center gap-10'>
                        {/* password */}
                        <div className="mb-6 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">Password</span>
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 15,
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).*$/
                                    })}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                />
                                <span
                                    className="absolute right-0 mr-4 mt-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            {/* handle errors */}
                            {errors.password?.type === "required" && (
                                <span className='mt-1 text-red-800'>Password is required</span>
                            )}
                            {errors.password?.type === "minLength" && (
                                <span className='mt-1 text-red-800'>Password should be at least 6 characters</span>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <span className='mt-1 text-red-800'>Password should not more than 15 characters</span>
                            )}
                            {errors.password?.type === "pattern" && (
                                <span className='mt-1 text-red-800'>Password should have atleast one uppercase, one lowercase, one number and one special character</span>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="mb-6 flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-blackk/90 mb-1">Conirm Password</span>
                            </label>
                            <div className='relative'>
                                <input
                                    // type={showPassword ? "text" : "password"}
                                    type='password'
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === watch("password") || "Passwords do not match",  // match with the password 
                                        // minLength: 6,
                                        // maxLength: 15,
                                        // pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).*$/
                                    })}
                                    placeholder="Enter password again"
                                    className="input input-bordered w-full"
                                />
                                {/* <span
                                    className="absolute right-0 mr-4 mt-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span> */}
                            </div>

                            {errors.confirmPassword?.type === "required" && (
                                <span className='mt-1 text-red-800'>Confirm Password is required</span>
                            )}

                            {errors.confirmPassword?.type === "validate" && errors.confirmPassword.message === "Passwords do not match" && (
                                <span className='mt-1 text-red-800'>Passwords do not match</span>
                            )}

                        </div>
                    </div>



                    <div className="mb-5">
                        <label className="label">
                            <span className="label-text font-semibold text-blackk/90 mb-2 ">Avater</span>
                        </label> <br />
                        <input type="file"
                            {...register("image", { required: true })}
                            className="file-input" />
                    </div>

                    <div className='flex items-center justify-center pt-3'>
                        <input
                            type="submit"
                            className="text-white py-2 bg-redd/80 hover:bg-redd/90 hover:font-bold w-[60%] rounded cursor-pointer"
                            value="Sign up"
                        />
                    </div>
                </form>

                <p className=" pt-3 text-center">
                    Already registered?
                    <Link to="/login">
                        <span className="font-semibold text-redd/80  hover:text-redd hover:font-bold"> Go to log in </span>
                    </Link>
                </p>

                <p className="text-blackk/90 font-medium pt-3 text-center">Or sign up with</p>

                <SocialLogin></SocialLogin>
            </div>
        </div>

    );
};

export default Register;
