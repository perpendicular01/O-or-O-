import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pdpepe-blood-management.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;