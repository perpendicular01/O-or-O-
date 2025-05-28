import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxioSecure from "./useAxioSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axioSecure = useAxioSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axioSecure.get(`/users/admin/${user.email}`)
            console.log(res.data)

            return res.data?.admin
        },
    })

    return [isAdmin, isAdminLoading]

};

export default useAdmin;




