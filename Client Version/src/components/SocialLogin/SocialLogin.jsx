import React from 'react';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)
    const from = location.state?.from?.pathname || '/'


    const handleGoogleLogin = () => {

        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: "user",
                    firebaseUid: result.user?.uid
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "successfully logged in",
                            icon: "success"
                        });

                        
                        navigate(from, { replace: true })
                    })

            })

    }
    return (
        <div className=''>
            <div className="flex justify-center items-center gap-5 py-2">
                <button
                    className="border text-blue-900 rounded-full p-2 cursor-pointer">
                    <FaFacebookF />
                </button>
                <button className="border text-red-600 rounded-full p-2 cursor-pointer">
                    <FaInstagram />
                </button>
                <button
                    onClick={handleGoogleLogin}
                    className="border text-blue-600 rounded-full p-2 cursor-pointer">
                    <FaGoogle />
                </button>
                <button className="border rounded-full p-2 cursor-pointer">
                    <FaTwitter />
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;