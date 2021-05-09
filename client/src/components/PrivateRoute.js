import React from "react";
import { Route, Redirect } from "react-router";
const PrivateRoute = ({ component: Component, auth, pathRedirect, imagePath, status, ...rest }) => (
    <Route {...rest} render={props => (
        auth ? (
            <Component {...props} status={status} imagePath={imagePath} />
        ) : (
                <Redirect to={pathRedirect} />
            )
    )} />
)
export default PrivateRoute