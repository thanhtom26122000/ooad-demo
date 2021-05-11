import React, { useState } from "react";
import { ListItemIcon, List, ListItem, ListItemText, makeStyles, Paper, Popover, useTheme, useMediaQuery, SwipeableDrawer, IconButton, Container } from "@material-ui/core";
import Config from "../Config";
import ConfigInput from "../ConfigInput";
import { useHistory } from "react-router";
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
    countNotify: {
        position: "absolute",
        top: "-8px",
        right: "-4px",
        fontSize: "16px",
        backgroundColor: "#ae8c63",
        color: "white",
        borderRadius: "50%",
        width: "26px",
        height: "26px",
        textAlign: "center",
    },
    navigate: {
        padding: "8px 16px",
        fontWeight: 600,
        fontSize: "16px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#ae8c63",
            color: "#fff"
        }
    }
})
const Header = ({ image, auth, typeAccount, setAuth }) => {
    console.log("image", typeAccount)
    const classes = useStyles();
    const history = useHistory()
    const [openSwipe, setOpenSwipe] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMobile, setOpenMobile] = React.useState(false)
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    const handleClick = (event) => {
        if (isMobile) {
            setOpenMobile(true)
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ background: "#fff" }}>
            <Container style={{ display: "flex", padding: isMobile ? "20px" : "20px 20px", backgroundColor: isMobile ? "#282D33" : "#fff", alignItems: "center", justifyContent: "space-between" }}>
                {isMobile ?
                    <>
                        <IconButton onClick={() => setOpenSwipe(true)}>
                            <MenuIcon style={{ color: "#fff" }}></MenuIcon>
                        </IconButton>
                        <SwipeableDrawer open={openSwipe}
                            anchor="left"
                            onOpen={() => setOpenSwipe(true)}
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
                <div style={{ display: "flex", alignItems: "center", marginLeft: isMobile ? "auto" : "", cursor: "pointer" }} onClick={() => history.push("/")}>
                    <HomeIcon style={{ color: isMobile ? "#fff" : "#000", fontSize: "24px", marginRight: "8px" }}></HomeIcon>
                    <span style={{ color: isMobile ? "#fff" : "#000", fontSize: "24px" }}>EasyAccomod</span>
                </div>
                <div style={{ display: isMobile ? "none" : "flex", color: "#000" }}>
                    <div className={classes.navigate} onClick={() => history.push("/")}>
                        <span>Trang chủ</span>
                    </div>
                    <div className={classes.navigate} onClick={() => history.push("/advanced-search")}>
                        <span>Tìm kiếm</span>
                    </div>
                </div>
                {image && auth ? <img src={Config.BASE_URL + "/images/" + image} alt="avatar" style={{ width: "45px", height: "45px", borderRadius: "50%", border: "1px solid red", objectFit: "cover" }} onClick={handleClick}></img>
                    : <AccountCircleIcon style={{ cursor: "pointer", color: "#ae8c63" }} onClick={() => history.push("/sign-in")} />}

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
                                            <ListItem key={el.name} button onClick={() => history.push(el.path)}>
                                                <ListItemIcon>{el.icon}</ListItemIcon>
                                                <ListItemText primary={el.name}></ListItemText>
                                            </ListItem>
                                        )

                                    }) : ConfigInput.listControlTabAdmin.map(el => {
                                        return (
                                            <ListItem key={el.name} button onClick={() => history.push(el.path)}>
                                                <ListItemIcon>{el.icon}</ListItemIcon>
                                                <ListItemText primary={el.name}></ListItemText>
                                            </ListItem>
                                        )
                                    })}
                                <ListItem button onClick={() => {
                                    localStorage.removeItem("_user");
                                    history.push("/");
                                    setAuth()
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
                            </List>
                        </SwipeableDrawer>
                    )
                }
            </Container >
        </div>

    )
}
export default React.memo(Header)