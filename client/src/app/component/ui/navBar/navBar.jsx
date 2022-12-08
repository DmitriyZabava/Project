import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav className="bg-slate-800 h-16 w-full">
                <label className="text-slate-300 text-4xl leading-relaxed px-28 font-semibold">
                    <NavLink to="/">
                        SHOP
                    </NavLink>
                </label>
                <ul className="float-right mr-5">
                    <li className="inline-block leading-relaxed py-4">
                        <NavLink
                            className="text-slate-300 text-lg px-2 py-3 rounded uppercase hover:bg-slate-500 transition duration-1000"
                            to="/"
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className="inline-block leading-relaxed py-4">
                        <NavLink
                            className="text-slate-300 text-lg px-2 py-3 rounded uppercase hover:bg-slate-500 transition duration-1000"
                            to=""
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="inline-block leading-relaxed py-4">
                        <NavLink
                            className="text-slate-300 text-lg px-2 py-3 rounded uppercase hover:bg-slate-500 transition duration-1000"
                            to="/products"
                        >
                            Список Товаров
                        </NavLink>
                    </li>
                    <li className="inline-block leading-relaxed py-4">
                        <NavLink
                            className="text-slate-300 text-lg px-2 py-3 rounded uppercase hover:bg-slate-500 transition duration-1000"
                            to="/basket"
                        >
                            Корзина
                        </NavLink>
                    </li>
                    <li className="inline-block leading-relaxed py-4">
                        <NavLink
                            className="text-slate-300 text-lg px-2 py-3 rounded uppercase hover:bg-slate-500 transition duration-1000"
                            to="/auth"
                        >
                            Вход
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
