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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '',
                element: <DonorHome></DonorHome>
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
            }

        ]
    },
]);
