import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "./routes";

function AppRouter() {
    return (
        <div>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        component={route.component}
                        exact
                        path={route.path}
                    />
                ))}
                <Redirect to='/' />
            </Switch>
        </div>
    );
}

export default AppRouter;
