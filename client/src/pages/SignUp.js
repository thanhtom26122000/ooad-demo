import React, { useState } from 'react';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import '../resources/scss/auth.css'
import { TextField, makeStyles, InputAdornment, IconButton, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
const useStyle = makeStyles({
    textField: {
        marginRight: "16px",
        width: "calc((100% - 16px)/2)"
    },
    buttonGoogle: {
        border: "1px solid #908e8e",
        marginBottom: "8px"
    },
    rootSignUp: {
        width: "400px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "0 auto",
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
const SignUp = () => {
    const classes = useStyle();
    const history = useHistory();
    const [showPass, setShowPass] = useState(false);
    const [input, setInput] = useState({
        password: "",
        email: "",
    })
    const [error, setError] = useState({
        errorMessage: "",
        type: ""
    })
    console.log("xxxxx ", error)
    const handleOnChangeInput = (event, field) => {
        if (error.type.length > 0) {
            setError({
                errorMessage: "",
                type: ""
            })
        }
        setInput({
            ...input,
            [field]: event.target.value
        })

    }
    const handleResign = () => {
        return axios.post("http://localhost:8080/api/user/sign-up", input)
            .then((res) => {
                console.log("xxxxx status", res.data)
                if (res.status === 200) {
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                console.log("fucking error", err.response)
                if (err.response.status === 400) {
                    return setError({
                        errorMessage: err.response.data.errorMessage,
                        type: err.response.data.errorType
                    })
                }
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
            <h1 style={{ marginTop: "8px", fontSize: "24px", fontWeight: 400, color: "" }}>Sign Up</h1>
            <TextField
                variant="outlined"
                fullWidth={true}
                label="Email"
                type="email"
                style={{ marginBottom: "24px" }}
                onChange={(event) => handleOnChangeInput(event, "email")}
                error={error.type === "email" ? true : false}
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
                error={error.type === "password" ? true : false}
            />

            { error.type.length > 0 ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%" }}>{error.errorMessage}</Alert> : null}
            <Button fullWidth={true} variant="contained" color="primary" style={{ marginBottom: "16px" }} onClick={() => handleResign()}>SIGN UP</Button>
            <a href="/sign-in" style={{ marginLeft: "auto", color: "#1976d2", cursor: "pointer", textDecoration: "none" }}>Đã có tài khoản? Đăng nhập</a>
        </div >
    )
}
export default SignUp