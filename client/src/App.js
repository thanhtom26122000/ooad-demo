import React, { useEffect } from 'react';
import Account from './pages/Account';
import LandingPage from './pages/LandingPage';
import { Route, Switch } from 'react-router';
import PrivateRoute from "./components/PrivateRoute"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthRoute from './components/AuthRoute';
import { checkIsLogIn, setIsAuth } from './redux/actions/auth';
import { connect } from 'react-redux';
import Modal from "./components/Modal"
import ReactGA from 'react-ga';
import Property from './pages/Property';
import ListSearch from './components/ListSearch';
import Footer from './components/Footer';
const App = ({ checkIsLogIn = () => { }, authReducer, imagePath, typeAccount, setIsAuth }) => {
    useEffect(() => {
        console.log("ty")
        ReactGA.initialize("UA-186055766-1");
        ReactGA.pageview("/")
    })
    useEffect(() => {
        checkIsLogIn()
    }, [checkIsLogIn])

    if (!authReducer.isLoaded || authReducer.loading) {
        return (
            <Modal show={true}></Modal>
        )
    }
    console.log(typeAccount, "typeAccount")
    return (
        <div style={{ height: "100%" }}>
            <Switch>
                <Route exact path="/">
                    <LandingPage setIsAuth={() => setIsAuth()} typeAccount={typeAccount} image={imagePath} auth={authReducer.isLogin}></LandingPage>
                </Route>
                <Route exact path="/property/:id" >
                    <Property auth={authReducer.isLogin}></Property>
                </Route>
                <PrivateRoute path="/account/:child" pathRedirect="/sign-in" component={Account} auth={authReducer.isLogin}></PrivateRoute>
                <Route exact path="/advanced-search">
                    <ListSearch typeAccount={typeAccount} image={imagePath}></ListSearch>
                </Route>
                <AuthRoute exact path="/sign-in" component={SignIn} auth={authReducer.isLogin} typeAccount={typeAccount}></AuthRoute>
                <AuthRoute exact path="/sign-up" component={SignUp} auth={authReducer.isLogin}></AuthRoute>
            </Switch>
        </div>

    );
}
const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    imagePath: state.userReducer.imagePath,
    typeAccount: state.userReducer.typeAccount,

})
const mapDispatchToProps = (dispatch) => ({
    checkIsLogIn: () => dispatch(checkIsLogIn()),
    setIsAuth: (auth) => dispatch(setIsAuth(auth))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
