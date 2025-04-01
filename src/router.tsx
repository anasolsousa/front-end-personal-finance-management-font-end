import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import User from "./pages/User/index.tsx";
import Admin from "./pages/Admin/index.tsx";
import HomeAdmin from "./pages/HomePageAdmin/index.tsx";

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
                element: <Admin/>
            },
            {
                path: "/homeAdmin",
                element: <HomeAdmin/>
            }
        ]
    }
])