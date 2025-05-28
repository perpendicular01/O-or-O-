import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxioSecure from "./useAxioSecure";

const useDonor = () => {
    const { user } = useAuth();
    const axioSecure = useAxioSecure();

    const { data: isDonor, isPending: isDonorLoading } = useQuery({
        queryKey: [user?.email, 'isDonor'],
        queryFn: async () => {
            const res = await axioSecure.get(`/users/donor/${user.email}`)
            console.log(res.data)

            return res.data?.donor
        },
    })

    return [isDonor, isDonorLoading]

};

export default useDonor;