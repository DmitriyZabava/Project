import {Navigate} from "react-router-dom"

import AdminPage from "../page/adminPage";
import AuthLayout from "../../layouts/authLayout";
import BasketPage from "../page/basketPage";
import LoginPage from "../page/loginPage";
import RegisterPage from "../page/registerPage";
import OneModelPage from "../page/OneModelPage";
import Showcase from "../../layouts/showcase";


const routes =()=> [
    {
        path: "/", element: <Showcase/>,children: [
            {
                path: ":brand/*",element: <Showcase/>,children:[
                    {
                        path: ":modelsId",element: <OneModelPage/>
                    }
                ]
            },
            {
                path: "*",element: <Navigate to="/"/>
            }
        ]
    },
    {
        path: "auth", element: <AuthLayout/>, children: [
            {
                path: "", element: <Navigate to="/auth/signUp"/>
            },
            {
                path: "login", element: <LoginPage/>
            },
            {
                path:"signUp",element:<RegisterPage/>
            },
            {
                path: "*",element: <Navigate to="/auth/signUp"/>
            }
        ]
    },
    {
        path: "basket",element: <BasketPage/>,children: [
            {
                path: "*",element: <Navigate to="/auth/signUp"/>
            }
        ]
    },
    {
        path: "admin",element: <AdminPage/>
    },
    {
        path: "*",element: <Navigate to="/"/>
    }

];

export default routes