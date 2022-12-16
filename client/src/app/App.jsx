import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRoutes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./component/ui/navBar";
import {loadAutoBrandList} from "./store/autoBrand";
import {loadAutoModelsList} from "./store/autoModels";
import routes from "./component/appRouter/routes";
import {getCurrentUserRole, getIsLoggetIn} from "./store/auth";


function App() {
    const isLoggetIn = useSelector(getIsLoggetIn());
    const currentUserRole = useSelector(getCurrentUserRole());

    console.log("App,LOgt,ROLE", isLoggetIn, currentUserRole);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAutoModelsList());
        dispatch(loadAutoBrandList());
    }, []);

    const elements = useRoutes(routes(isLoggetIn, currentUserRole));

    return (
        <div className="md:container md:mx-auto">
            <NavBar/>
            {elements}
            <ToastContainer/>
        </div>
    );
}

export default App;
