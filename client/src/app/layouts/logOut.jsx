import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {logOut} from "../store/auth";
import {createGuest, userLogOut} from "../store/user";


function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userLogOut());
        dispatch(logOut());
        dispatch(createGuest());
        navigate("/");
    }, []);
    return <div>out</div>;
}

export default LogOut;