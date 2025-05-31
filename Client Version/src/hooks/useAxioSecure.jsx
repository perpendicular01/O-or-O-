import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axioSecure = axios.create({
    baseURL: "https://pdpepe-blood-management.vercel.app",
    withCredentials: true
})



const useAxioSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axioSecure.interceptors.response.use(
            response => response,
            error => {
                console.log('error caught in interceptor', error);

                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log('have to sign out');
                    logOut()
                        .then(() => {
                            console.log('logged out user');
                            navigate('/auth/login');
                        })
                        .catch(err => {
                            console.log('Sign out error:', err);
                        });
                }

                return Promise.reject(error);
            }
        );

        // Optional: remove interceptor when component unmounts
        return () => {
            axioSecure.interceptors.response.eject(interceptor);
        };
    }, [navigate, logOut]);


    return axioSecure;

};

export default useAxioSecure;