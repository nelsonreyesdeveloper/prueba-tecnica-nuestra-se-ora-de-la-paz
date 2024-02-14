import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./views/Login";
import AdminLayout from "./layout/AdminLayout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Login />
            },

        ],

    },
    {
        path: "/dashboard",
        element: <AdminLayout />,
    }
]);

export default router