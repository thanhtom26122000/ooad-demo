import React, { useState } from 'react';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import '../resources/scss/auth.css'
import { TextField, makeStyles, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { setIsAuth } from '../redux/actions/auth';
import { connect } from "react-redux"
const useStyle = makeStyles({
    textField: {
        marginRight: "16px",
        width: "calc((100% - 16px)/2)"
    },
    buttonWithoutHover: {
        marginLeft: "auto",
        color: "#1976d2",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "transparent"
        }
    },
    rootSignUp: {
        width: "400px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "0px auto",
        paddingTop: "120px"
    },
    circle: {
        width: "40px",
        height: "40px",
        backgroundColor: "rgb(220, 0, 78)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%"
    },
    lockIcon: {
        width: "24px",
        height: "24px",
        color: "white",
    },
    rootSignIn: {
        width: "400px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "120px auto",
    }
})
const SignIn = ({ setIsAuth, typeAccount }) => {
    console.log("xxx 123123123", typeAccount);
    const classes = useStyle();
    const history = useHistory()
    const [showPass, setShowPass] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [errorLogin, setErrorLogin] = useState(false);
    const handleOnChangeInput = (event, field) => {
        setInput({
            ...input,
            [field]: event.target.value
        })
    }
    const handleSignIn = () => {
        return axios.post("http://localhost:8080/api/user/sign-in", input, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("_user", res.data);
                    setIsAuth(true)
                    history.push(typeAccount === 1 ? "/account/verify-account" : "/account/list-account");
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
                setErrorLogin(true)
            })
    }
    const handleClickShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className={classes.rootSignUp}>
            <div className={classes.circle}>
                <LockOutlinedIcon className={classes.lockIcon}></LockOutlinedIcon>
            </div>
            <h1 style={{ marginTop: "8px", fontSize: "24px", fontWeight: 400 }}>Sign In</h1>
            <TextField
                variant="outlined"
                fullWidth={true}
                label="Tên đăng nhập/Email"
                type="email"
                style={{ marginBottom: "24px" }}
                onChange={(event) => handleOnChangeInput(event, "email")}
            />
            <TextField
                variant="outlined"
                fullWidth={true}
                label="Mật Khẩu"
                type={showPass ? "text" : "password"}
                style={{ marginBottom: "16px" }}
                onChange={(event) => handleOnChangeInput(event, "password")}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleClickShowPass()}>
                                {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {errorLogin ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%" }} >Tên đăng nhập hoặc mật khẩu sai</Alert> : null}
            <Button fullWidth={true} variant="contained" color="primary" style={{ marginBottom: "16px" }} onClick={() => handleSignIn()}>SIGN IN</Button>
            <Button href="/sign-up" disableRipple={true} className={classes.buttonWithoutHover} type="text">Chưa có tài khoản? Đăng ký ngay</Button>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    setIsAuth: (isAuth) => dispatch(setIsAuth(isAuth))
})
export default connect(null, mapDispatchToProps)(SignIn)