import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useRoutes} from "react-router-dom"

import NavBar from "./component/ui/navBar";
import {loadAutoBrandList} from "./store/autoBrand";
import {loadAutoModelsList} from "./store/autoModels";
import routes from "./component/appRouter/routes";



function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAutoModelsList())
        dispatch(loadAutoBrandList())
    }, []);

    const elements=useRoutes(routes())

    return (
        <div className='md:container md:mx-auto'>
            <NavBar />
            {elements}
        </div>
    );
}

export default App;
