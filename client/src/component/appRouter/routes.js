import AdminPage from "../page/adminPage";
import AuthLayout from "../page/authLayout";
import BasketPage from "../page/basketPage";
import LoginPage from "../page/loginPage";
import RegisterPage from "../page/registerPage";
import ShowcasePage from "../page/ShowcasePage";
import OneModelPage from "../page/OneModelPage";

export const routes = [
    {
        path: "/admin",
        component: AdminPage,
    },
    {
        path: "/",
        component: ShowcasePage,
    },
    {
        path: "/:brand?",
        component: ShowcasePage,
    },
    {
        path: "/:brand?/:modelsId?",
        component: OneModelPage,
    },
    {
        path: "/basket",
        component: BasketPage,
    },
    {
        path: "/authLayout",
        component: AuthLayout,
    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/register",
        component: RegisterPage,
    },
];
