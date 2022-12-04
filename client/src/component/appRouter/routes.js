import AdminPage from "../page/adminPage";
import AuthLayout from "../page/authLayout";
import BasketPage from "../page/basketPage";
import LoginPage from "../page/loginPage";
import ProductPage from "../page/productPage";
import RegisterPage from "../page/registerPage";
import ShowcasePage from "../page/ShowcasePage";

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
        path: "/product/:productId?",
        component: ProductPage,
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
