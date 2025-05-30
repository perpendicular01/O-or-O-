import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
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
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        children: [
            {
                path: '',
                element: <PrivateRoute> <DashboardHome></DashboardHome> </PrivateRoute>
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
                element: <AllUsers></AllUsers>
            },
            {
                path: 'all-blood-donation-request',
                element: <AllRequest></AllRequest>
            },
            {
                path: 'update-request/:id',
                element: <UpdateRequest></UpdateRequest>,
                loader: ({ params }) => fetch(`http://localhost:5000/donationRequests/${params.id}`),
            },
            {
                path: 'content-management',
                element: <ContentMangement></ContentMangement>,
                
            },
            {
                path: 'content-management/add-blog',
                element: <AddBlogs></AddBlogs>
            },
            {
                path: 'content-management/update-blog/:id',
                element: <UpdateBlogs></UpdateBlogs>,
                loader: ({params}) => fetch(`http://localhost:5000/blogs/${params.id}`)
            }


        ]
    },
]);
