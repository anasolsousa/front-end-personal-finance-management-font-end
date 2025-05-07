import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import User from "./pages/User/index.tsx";
import AdminLogin from "./pages/AdminLogin/index.tsx";
import HomePageAdmin from "./pages/HomePageAdmin/index.tsx";
import ProfileAdmin from "./pages/ProfileAdmin/index.tsx";
import Dashboard from "./pages/Dashboard/index.tsx";
import ProfileUser from "./pages/ProfileUser/index.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/user",
                element: <User/>
            },
            {
                path: "/admin",
                element: <AdminLogin/>
            },
            {
                path: "/homeAdmin",
                element: <HomePageAdmin/>
            },
            {
                path: "/profileAdmin",
                element: <ProfileAdmin/>
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/profileUser",
                element: <ProfileUser/>
            }
        ]
    }
])