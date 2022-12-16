import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav className='bg-gray-800 h-16 w-full'>
                <label className='text-gray-300 text-4xl leading-relaxed px-28 font-semibold'>
                    <NavLink to='/'>SHOP</NavLink>
                </label>
                <ul className='float-right mr-5'>
                    <li className='inline-block leading-relaxed py-4'>
                        <NavLink
                            className='text-gray-300 text-lg px-2 py-3 rounded uppercase hover:bg-gray-500 transition duration-1000'
                            to='/admin'
                        >
                            Admin
                        </NavLink>
                    </li>
                    <li className='inline-block leading-relaxed py-4'>
                        <NavLink
                            className='text-gray-300 text-lg px-2 py-3 rounded uppercase hover:bg-gray-500 transition duration-1000'
                            to='/'
                        >
                            Главная
                        </NavLink>
                    </li>

                    <li className='inline-block leading-relaxed py-4'>
                        <NavLink
                            className='text-gray-300 text-lg px-2 py-3 rounded uppercase hover:bg-gray-500 transition duration-1000'
                            to='/'
                        >
                            Список Товаров
                        </NavLink>
                    </li>
                    <li className='inline-block leading-relaxed py-4'>
                        <NavLink
                            className='text-gray-300 text-lg px-2 py-3 rounded uppercase hover:bg-gray-500 transition duration-1000'
                            to='/basket'
                        >
                            Корзина
                        </NavLink>
                    </li>
                    <li className='inline-block leading-relaxed py-4'>
                        <NavLink
                            className='text-gray-300 text-lg px-2 py-3 rounded uppercase hover:bg-gray-500 transition duration-1000'
                            to='/auth'
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
