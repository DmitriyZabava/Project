import {useRoutes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./component/appRouter/routes";
import {useSelector} from "react-redux";
import {getCurrentUserRole, getIsLoggedIn} from "./store/auth";
import AppLoader from "./component/ui/hoc/appLoader";
import NavBar from "./component/ui/navBar/";


function App() {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserRole = useSelector(getCurrentUserRole());

    const elements = useRoutes(routes(isLoggedIn, currentUserRole));

    return (
        <div className="md:container md:mx-auto">
            <AppLoader>
                <NavBar/>

                {elements}
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
