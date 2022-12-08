import {Routes, useRoutes} from "react-router-dom";
import routes from "./routes";

function AppRouter() {
    const element = useRoutes(routes);
    return (
        <div>
            <Routes>
                {element}
                {/*{routes.map((route) => (*/}
                {/*    <Route*/}
                {/*        key={route.path}*/}
                {/*        component={route.component}*/}
                {/*        exact*/}
                {/*        path={route.path}*/}
                {/*    />*/}
                {/*))}*/}

            </Routes>
        </div>
    );
}

export default AppRouter;
