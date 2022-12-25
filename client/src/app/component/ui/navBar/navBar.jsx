import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../../store/auth";
import {getAccessLevel, getCurrentUser, getUserLoadingStatus} from "../../../store/user";
import Loader from "../../common/Loader/loader";
import UserBar from "./userBar";
import OtherBar from "./OterBar";


function NavBar() {
    const currentUser = useSelector(getCurrentUser());
    const accessLevel = useSelector(getAccessLevel());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(currentUser.username);
    }, [currentUser]);

    if(userLoadingStatus) return <Loader/>;


    return (
        <header>
            {!accessLevel ?
                <UserBar
                    isLoggedIn={isLoggedIn}
                    userName={userName}/> :
                <OtherBar
                    isLoggedIn={isLoggedIn}
                    userName={userName}/>
            }
        </header>
    );
}

export default NavBar;
