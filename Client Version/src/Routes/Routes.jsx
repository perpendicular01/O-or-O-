import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Request from "../Pages/Dashboard/Donor/Request/Request";
import MyRequest from "../Pages/Dashboard/Donor/MyRequest/MyRequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import DonorHome from "../Pages/Dashboard/Donor/DonorHome/DonorHome";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import UpdateRequest from "../Pages/Dashboard/UpdateRequest/UpdateRequest";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ContentMangement from "../Pages/Dashboard/ContentManagement/ContentMangement";
import AddBlogs from "../Pages/Dashboard/AddBlogs/AddBlogs";
import UpdateBlogs from "../Pages/Dashboard/AddBlogs/UpdateBlogs";
import AllRequest from "../Pages/Dashboard/Admin/AllRequest/AllRequest";
import PrivateRoute from "./PrivateRoute";
import Search from "../Pages/Search/Search";
import Blogs from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/Blogs/BlogDetails";

import BloodDonationRequests from "../Pages/BloodDonationRequests/BloodDonationRequests";
import BloodDonationRequestDetails from "../Pages/BloodDonationRequestDetails/BloodDonationRequestDetails";
import AdminRoute from "./AdminRoute";
import AdminVolenteerRoute from "./AdminVolenteerRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'search',
                element: <Search />,
            },
            {
                path: 'blogs',
                element: <Blogs></Blogs>
            },
            {
                path: 'blog/:id',
                element: <BlogDetails />
            },
            
            {
                path: 'blood-donation-requests',
                element: <BloodDonationRequests />
            },

        
            {
                path: 'blood-donation-requests/:id',
                element: <PrivateRoute> <BloodDonationRequestDetails></BloodDonationRequestDetails> </PrivateRoute>
            }

        ]
    },
    {
        path: 'auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element: <Login></Login>

            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    },
    

    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        children: [
            {
                path: '',
                element: <DashboardHome></DashboardHome> 
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'create-donation-request',
                element: <Request></Request>
            },
            {
                path: 'my-donation-requests',
                element: <MyRequest></MyRequest>
            },
            {
                path: 'all-users',
                element: <AdminRoute> <AllUsers></AllUsers>  </AdminRoute>
            },
            {
                path: 'all-blood-donation-request',
                element: <AdminVolenteerRoute><AllRequest></AllRequest></AdminVolenteerRoute>
            },
            {
                path: 'update-request/:id',
                element: <UpdateRequest></UpdateRequest>,
                loader: ({ params }) => fetch(`https://pdpepe-blood-management.vercel.app/donationRequests/${params.id}`),
            },
            {
                path: 'content-management',
                element: <AdminVolenteerRoute> <ContentMangement></ContentMangement> </AdminVolenteerRoute>,
                
            },
            {
                path: 'content-management/add-blog',
                element: <AdminVolenteerRoute> <AddBlogs></AddBlogs> </AdminVolenteerRoute>
            },
            {
                path: 'content-management/update-blog/:id',
                element: <UpdateBlogs></UpdateBlogs>,
                loader: ({params}) => fetch(`https://pdpepe-blood-management.vercel.app/blogs/${params.id}`)
            },
            {
                path: 'donation-request/:id',
                element: <BloodDonationRequestDetails />
            }


        ]
    },
]);
