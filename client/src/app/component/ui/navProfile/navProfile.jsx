import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../../store/auth";
import {getCurrentUser} from "../../../store/user";

export default function NavProfile() {
    const [isOpen, setOpen] = useState(false);
    const currentUser = useSelector(getCurrentUser());
    const isLoggedIn = useSelector(getIsLoggedIn);


    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if(isLoggedIn) {
        return (
            <div className="relative w-full lg:max-w-sm"
                 onClick={toggleMenu}
            >
                {currentUser.username}
                <select
                    className={"w-full px-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 " + ( isOpen ? "invisible" : "visible" )}>
                    <option>ReactJS Dropdown</option>
                    <option>
                        <button>Выйти</button>
                    </option>


                </select>
            </div>
        );
    }
}