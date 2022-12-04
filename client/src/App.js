import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./component/appRouter/appRouter";

import NavBar from "./component/ui/navBar";
import {loadAutoBrandList} from "./store/autoBrand";
import {loadAutoModelsList} from "./store/autoModels";


// import CategoriesList from "./component/ui/CategoriesList/categoriesList";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAutoModelsList())
        dispatch(loadAutoBrandList())
    }, []);

    return (
        <div className='md:container md:mx-auto'>
            <NavBar />
            <AppRouter />

            {/* <CategoriesList /> */}
        </div>
    );
}

export default App;
