import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoggedIn} from "../../../store/auth";
import {getCurrentUser, getUserLoadingStatus} from "../../../store/user";
import Loader from "../../common/Loader/loader";
import {useEffect, useState} from "react";

function NavBar() {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const [userName, setUserName] = useState("");
    useEffect(() => {
        setUserName(currentUser.username);
    }, []);


    if(userLoadingStatus) return <Loader/>;


    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {isLoggedIn ? <div className="flex items-center lg:order-2">
                        <span
                            className="text-gray-800 dark:text-white  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none dark:focus:ring-gray-800">
                            {userName}
                        </span>
                        <button

                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            Выход
                        </button>
                    </div> : <div className="flex items-center lg:order-2">
                        <span
                            className="text-gray-800 dark:text-white  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none dark:focus:ring-gray-800">
                            {userName}
                        </span>

                        <Link
                            to="/auth"
                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            Вход/Регистрация
                        </Link>
                    </div>}
                    <label className="text-gray-300 text-3xl leading-relaxed px-5 font-semibold">
                        <Link to="/">SHOP</Link>
                    </label>
                    <div
                        className="hidden justify-between w-full lg:flex lg:w-auto lg:mx-auto lg:content-end lg:order-1">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-5 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Главная
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/admin"
                                    className="block py-2 px-5 mx-auto text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/basket"
                                    className="block py-2 px-5 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Корзина
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
