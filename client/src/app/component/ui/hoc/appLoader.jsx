import React, {useEffect} from "react";
import PropTypes from "prop-types";


import {getModelsDataStatus, loadAutoModelsList} from "../../../store/autoModels";
import {getBrandDataStatus, loadAutoBrandList} from "../../../store/autoBrand";
import localStorageService from "../../../service/localStorage.service";
import {checkAuth, getIsLoggedIn} from "../../../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {createGuest, getUserLoadingStatus} from "../../../store/user";
import Loader from "../../common/Loader";
import {getDescriptionsDataStatus, loadDescriptions} from "../../../store/descriptions";

function AppLoader({children}) {
    const dispatch = useDispatch();
    const currentToken = localStorageService.getAccessToken();
    const brandDataStatus = useSelector(getBrandDataStatus());
    const modelsDataStatus = useSelector(getModelsDataStatus());
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const descriptionDataStatus = useSelector(getDescriptionsDataStatus);


    const isLoggedIn = useSelector(getIsLoggedIn());


    useEffect(() => {

        dispatch(loadAutoModelsList());
        dispatch(loadAutoBrandList());
        dispatch(loadDescriptions());
        if(currentToken && currentToken !== "undefined") {
            dispatch(checkAuth());
        } else {
            dispatch(createGuest());
        }

    }, []);

    if(!brandDataStatus || !modelsDataStatus || userLoadingStatus || !descriptionDataStatus) {

        return <Loader/>;
    } else {
        return children;
    }


}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AppLoader;