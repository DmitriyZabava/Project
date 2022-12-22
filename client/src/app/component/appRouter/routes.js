import {Navigate} from "react-router-dom";

import AdminPage from "../page/AdminPage";
import AuthLayout from "../../layouts/authLayout";
import BasketPage from "../page/BasketPage";
import OneModelPage from "../page/OneModelPage";
import Showcase from "../../layouts/showcase";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";

const routes = (isLoggetIn, currentUserRole) => [
    {
        path: "/",
        element: <Showcase/>,
        children: [
            {
                path: ":brand/*",
                element: <Showcase/>,
                children: [
                    {
                        path: ":modelsId",
                        element: <OneModelPage/>,
                    },
                ],
            },
            {
                path: "*",
                element: <Navigate to="/"/>,
            },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout/>,
        children: [
            {
                path: "",
                element: <Navigate to="/auth/signUp"/>,
            },
            {
                path: "login",
                element: <LoginForm/>,
            },
            {
                path: "signUp",
                element: <RegisterForm/>,
            },
            {
                path: "*",
                element: <Navigate to="/auth/signUp"/>,
            },
        ],
    },
    {
        path: "basket",
        element: <BasketPage/>,
        children: [
            {
                path: "*",
                element: <Navigate to="/auth/signUp"/>,
            },
        ],
    },
    {
        path: "admin",
        element: <AdminPage/>,
    },
    {
        path: "*",
        element: <Navigate to="/"/>,
    },
];

export default routes;
