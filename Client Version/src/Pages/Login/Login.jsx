import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";

import animation from '../../assets/Animation/login.json';
import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [disable, setDisable] = useState(true);
    const [loginError, setLoginError] = useState('');
    const { signIn } = useContext(AuthContext)
    
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)
    const from = location.state?.from?.pathname || '/'

   


    // for captcha
    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, []);

    // const handleCaptcha = (e) => {
    //     const userUsedValue = e.target.value;
    //     if (validateCaptcha(userUsedValue)) {
    //         setDisable(false);
    //     }
    //     else {
    //         setDisable(true)
    //     }
    // }

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password)

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)

                Swal.fire({
                    title: "successfully logged in",
                    icon: "success"
                });

                form.reset()
                navigate(from , {replace: true})

            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: "Invalid email or password",
                    icon: "error"
                });
            });


    }

    return (
        <div
            className=" flex items-center justify-center pt-5">
            <div className="   bg-center w-full flex flex-col-reverse lg:flex-row gap-10 items-center justify-center bg-redd/5  rounded-lg shadow-[10px_10px_20px_rgba(0,0,0,0.9)] max-w-3xl lg:max-w-6xl p-8 ">
                {/* Lottie Animation Section */}
                <div classNFame="w-1/2 md:w-2/5  flex items-center justify-center">
                    <div className="w-30 md:w-44 lg:w-60">
                        <Lottie animationData={animation} loop={true} />
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="w-full md:w-1/2 px-4">
                    <p className="font-stylish text-redd font-bold  text-3xl pb-5 text-center">Login</p>
                    <p className='border-t-2 w-7 mx-auto -mt-3 text-redd mb-6'></p>

                    <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
                         {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text font-medium text-blackk/90 mb-1">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text font-medium text-blackk/90 mb-1">Password</span>
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <span
                                    className="absolute right-0 mr-4 mt-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* <div className="mb-4 ">
                            <label className="label  hover:blackk ">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                onBlur={handleCaptcha}
                                type="text"
                                name='captcha'
                                placeholder="type the captcha above"
                                className="input input-bordered w-full mt-2"
                                required
                            />
                        </div> */}

                        <div className="text-left mb-4 ">
                            <a href="#" className="link link-hover underline text-sm text-blue-500 hover:text-blue-800 hover:font-medium">Forgot password?</a>
                        </div>

                        <input
                            
                            type="submit"
                            className={`py-2 w-full rounded transition bg-redd/80 hover:bg-redd hover:font-semibold text-white cursor-pointer"}`}
                            value="Sign In"
                        />


                    </form>

                    <p className=" pt-3 text-center">
                        New here?
                        <Link to="/auth/register">
                            <span className="font-semibold text-redd/80  hover:text-redd hover:font-bold"> Create a New Account </span>
                        </Link>
                    </p>

                    <p className=" font-medium pt-3 text-blackk/90 text-center">Or sign in with</p>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
