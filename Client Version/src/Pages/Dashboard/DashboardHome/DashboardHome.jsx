import useAdmin from '../../../hooks/useAdmin';
import useVolenteer from '../../../hooks/useVolenteer';
import useDonor from '../../../hooks/useDonor';
import useAuth from '../../../hooks/useAuth';
import DonorHome from '../Donor/DonorHome/DonorHome';
import AdminHome from '../Admin/AdminHome/AdminHome';
import VolenteerHome from '../Volenteer/VolenterHome/VolenteerHome';

const DashboardHome = () => {
    const { loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isVolenteer, isVolenteerLoading] = useVolenteer();
    const [isDonor, isDonorLoading] = useDonor();

    if (loading || isAdminLoading || isVolenteerLoading || isDonorLoading) {
        return <span className="loading loading-dots loading-xl"></span>;
    }

    if (isAdmin) return  <AdminHome></AdminHome> ;
    if (isVolenteer) return <VolenteerHome></VolenteerHome>;
    if (isDonor) return   <DonorHome></DonorHome>;
 


};

export default DashboardHome;
