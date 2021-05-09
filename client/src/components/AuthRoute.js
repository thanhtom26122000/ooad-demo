import React from "react";
import { Route, Redirect } from "react-router";
const AuthRoute = ({ component: Component, auth, typeAccount, ...rest }) => (
    <Route {...rest} render={props => (
        !auth ? (
            <Component {...props} typeAccount={typeAccount} />
        ) : (
            <Redirect to="/" />
        )
    )} />
)
export default AuthRoute