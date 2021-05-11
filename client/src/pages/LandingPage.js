import { Container, makeStyles, Popover, Paper, List, ListItemText, ListItem, ListItemIcon, useTheme, useMediaQuery, SwipeableDrawer, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "../resources/scss/landing-page.scss";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItems from "../components/ListItem";
import { useHistory } from "react-router";
import Config from "../Config"
import Search from "../components/Search";
import ConfigInput from "../ConfigInput";
import SearchColumn from "../components/SearchColum"
import Footer from "../components/Footer";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles({
    accountIcon: {
        color: "white",
        fontSize: "30px",
        cursor: "pointer",
        "&:hover": {
            opacity: "0.6"
        }
    },
    containerNavigation: {
        display: "flex",
        position: "relative",
        padding: "20px",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        cursor: "pointer"
    },
    gridContainer: {
        marginTop: "auto",
        marginBottom: "100px",
        backgroundColor: "transparent"
    },
    select: {
        minWidth: "200px"
    },
    navigate: {
        padding: "8px 16px",
        fontWeight: 600,
        fontSize: "16px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#ae8c63"
        }
    }
})
const LandingPage = ({ setIsAuth, auth, image, typeAccount }) => {
    console.log("xx auth", auth, "image", image)
    const classes = useStyles();
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openSwipe, setOpenSwipe] = useState(false)
    const [openMobile, setOpenMobile] = React.useState(false)


    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (isMobile) {
            setOpenMobile(true)
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    return (
        <div style={{ backgroundColor: "#f7f7f7" }}>
            <header className="header">
                <div className="image-opacity"></div>
                <Container style={{ backgroundColor: isMobile ? "#282D33" : "", padding: isMobile ? "0px" : "" }}>
                    <div className={classes.containerNavigation} >
                        {isMobile ?
                            <>
                                <IconButton onClick={() => setOpenSwipe(true)}>
                                    <MenuIcon style={{ color: "#fff" }}></MenuIcon>
                                </IconButton>
                                <SwipeableDrawer open={openSwipe}
                                    anchor="left"
                                    onClose={() => setOpenSwipe(false)}
                                >
                                    <List style={{ width: "300px", height: "100%", backgroundColor: "#161d21" }}>
                                        <ListItem button onClick={() => history.push("/")}>
                                            <ListItemText primary="Trang Chủ" style={{ color: "#fff" }} ></ListItemText>
                                        </ListItem>
                                        <hr></hr>
                                        <ListItem button onClick={() => history.push("/advanced-search")}>
                                            <ListItemText primary="Tìm kiếm" style={{ color: "#fff" }}></ListItemText>
                                        </ListItem>
                                        <hr></hr>
                                    </List>
                                </SwipeableDrawer>
                            </>
                            : null}
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <HomeIcon style={{ color: "#fff", fontSize: "24px" }}></HomeIcon>
                            <span style={{ color: "#fff", fontSize: "24px" }}>EasyAccomod</span>
                        </div>
                        <div style={{ display: isMobile ? "none" : "flex", color: "#fff" }}>
                            <div className={classes.navigate} onClick={() => history.push("/")}>
                                <span>Trang chủ</span>
                            </div>
                            <div className={classes.navigate} onClick={() => history.push("/advanced-search")}>
                                <span>Tìm kiếm</span>
                            </div>
                        </div>
                        {auth && image ?
                            <>
                                <img src={Config.BASE_URL + "/images/" + image}
                                    alt="avatar"
                                    style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: "cover" }}
                                    onClick={handleClick} />
                                {!isMobile ? (
                                    <Popover
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <Paper >
                                            <List component="nav">
                                                {typeAccount === Config.MEMBER_ACCOUNT ?
                                                    ConfigInput.listControlTabMember.map(el => {
                                                        return (
                                                            <ListItem button onClick={() => history.push(el.path)}>
                                                                <ListItemIcon>{el.icon}</ListItemIcon>
                                                                <ListItemText primary={el.name}></ListItemText>
                                                            </ListItem>
                                                        )

                                                    }) : ConfigInput.listControlTabAdmin.map(el => {
                                                        return (
                                                            <ListItem button onClick={() => history.push(el.path)}>
                                                                <ListItemIcon>{el.icon}</ListItemIcon>
                                                                <ListItemText primary={el.name}></ListItemText>
                                                            </ListItem>
                                                        )
                                                    })}
                                                <ListItem button onClick={() => {
                                                    localStorage.removeItem("_user");
                                                    history.push("/");
                                                    setIsAuth()
                                                }}>
                                                    <ListItemIcon>
                                                        <ExitToAppIcon></ExitToAppIcon>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Đăng xuất"></ListItemText>
                                                </ListItem>
                                            </List>
                                        </Paper>
                                    </Popover>
                                )
                                    :
                                    (
                                        <SwipeableDrawer open={openMobile}
                                            anchor="right"
                                            onClose={() => setOpenMobile(false)}
                                        >
                                            <List component="nav" style={{ width: "300px", height: "100%", backgroundColor: "#161d21" }}>
                                                {typeAccount === Config.MEMBER_ACCOUNT ?
                                                    ConfigInput.listControlTabMember.map(el => {
                                                        return (
                                                            <>
                                                                <ListItem button onClick={() => history.push(el.path)}>
                                                                    <ListItemIcon style={{ color: "#fff", fontSize: "13px" }}>{el.icon}</ListItemIcon>
                                                                    <ListItemText style={{ fontSize: "13px", color: "#fff" }} primary={el.name}></ListItemText>
                                                                </ListItem>
                                                                <hr></hr>
                                                            </>
                                                        )

                                                    }) : ConfigInput.listControlTabAdmin.map(el => {
                                                        return (
                                                            <ListItem button onClick={() => history.push(el.path)}>
                                                                <ListItemIcon style={{ color: "#fff", fontSize: "13px" }}>{el.icon}</ListItemIcon>
                                                                <ListItemText style={{ fontSize: "13px", color: "#fff" }} primary={el.name}></ListItemText>
                                                                <hr></hr>
                                                            </ListItem>
                                                        )
                                                    })}
                                                <ListItem button onClick={() => {
                                                    localStorage.removeItem("_user");
                                                    history.push("/");
                                                    setIsAuth()
                                                }}>
                                                    <ListItemIcon>
                                                        <ExitToAppIcon></ExitToAppIcon>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Đăng xuất"></ListItemText>
                                                </ListItem>
                                            </List>
                                        </SwipeableDrawer>
                                    )
                                }
                            </>
                            : <AccountCircleIcon onClick={() => history.push("/sign-in")} className={classes.accountIcon}></AccountCircleIcon>}
                    </div>
                </Container >
                <div className="header-title">
                    <h1>Find the Perfect Home</h1>
                    <span>stop looking. start finding with wpresidence</span>
                </div>
            </header>
            {isMobile ? <SearchColumn></SearchColumn> : <Search></Search>}
            <ListItems search={false}></ListItems>
            {/* <Footer></Footer> */}
        </div >

    )
}

export default React.memo(LandingPage)