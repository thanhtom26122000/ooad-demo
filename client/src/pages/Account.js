import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ControlTab from "../components/ControlTab";
import Header from "../components/Header";
import Profile from "../components/VerifyAccount";
import "../resources/scss/account.scss";
import AddProperty from "../components/AddProperty"
import Favorites from "../components/Favorites";
import AlertDialog from "../components/Dialog/AlertDialog";
import { connect } from "react-redux";
import ListPropery from "../components/ListProperty";
import ListAccount from "../components/ListAccount";
import ListRealEstates from "../components/ListRealEstates";
import { setIsAuth } from "../redux/actions/auth";
const Account = ({ userReducer, setIsAuth }) => {
    const { url } = useRouteMatch()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    // if (userReducer.loading) {
    //     return (
    //         <Modal show={userReducer.loading}></Modal>
    //     )
    // }
    console.log("xxxx", userReducer.typeAccount);
    return (
        <>
            <Header auth={true} setAuth={() => setIsAuth()} role={userReducer.role} image={userReducer.imagePath}></Header>
            <Grid container style={{ height: "calc(100% - 89px)" }}>
                {isMobile ? null : <Grid item xs={2} style={{ borderRight: "1px solid #E4E4E4" }} >
                    <ControlTab image={userReducer.imagePath} typeAccount={userReducer.typeAccount} ></ControlTab>
                </Grid>}
                <Grid item xs={isMobile ? 12 : 10}>
                    {((userReducer.role !== 2) && url === "/account/add-property") ? <AlertDialog role={userReducer.role} isVerify={false}></AlertDialog> : null}
                    {userReducer.typeAccount == 1 ? (
                        <Switch>
                            <Route exact path="/account/verify-account" render={() => <Profile role={userReducer.role}></Profile>} >
                            </Route>
                            <Route exact path="/account/add-property" component={AddProperty}></Route>
                            <Route exact path="/account/favorites" component={Favorites}></Route>
                            <Route exact path="/account/list-property" component={ListPropery}></Route>
                        </Switch>
                    ) :
                        (
                            <Switch>
                                <Route exact path="/account/admin/add-property" component={AddProperty}></Route>
                                <Route exact path="/account/admin/list-account" component={ListAccount}></Route>
                                <Route exact path="/account/admin/list-real-estate" component={ListRealEstates}></Route>
                            </Switch>
                        )}
                </Grid>
            </Grid>
        </>
    )
}
const mapStateToProps = (state) => ({
    userReducer: state.userReducer
})
const mapDispatchToProps = (dispatch) => {
    return {
        setIsAuth: (auth) => dispatch(setIsAuth(auth))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)