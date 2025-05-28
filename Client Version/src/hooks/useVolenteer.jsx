import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxioSecure from "./useAxioSecure";

const useVolenteer = () => {
    const { user } = useAuth();
    const axioSecure = useAxioSecure();

    const { data: isVolenteer, isPending: isVolenteerLoading } = useQuery({
        queryKey: [user?.email, 'isVolenteer'],
        queryFn: async () => {
            const res = await axioSecure.get(`/users/volenteer/${user.email}`)
            console.log(res.data)

            return res.data?.volenteer
        },
    })

    return [isVolenteer, isVolenteerLoading]

};

export default useVolenteer;