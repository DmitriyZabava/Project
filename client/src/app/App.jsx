import {useRoutes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./component/appRouter/routes";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "./store/auth";
import AppLoader from "./component/ui/hoc/appLoader";
import NavBar from "./component/ui/navBar/";
import {getAccessLevel} from "./store/user";
import Footer from "./component/common/footer";


function App() {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const accessLevel = useSelector(getAccessLevel());
    const elements = useRoutes(routes(isLoggedIn, accessLevel));

    return (
        <div className="md:container md:mx-auto">
            <AppLoader>
                <NavBar/>

                {elements}
                <Footer/>
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
