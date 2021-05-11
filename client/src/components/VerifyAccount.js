import { Button, Card, CardActionArea, CardMedia, Grid, makeStyles, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfigInput from "../ConfigInput";
import { getUserInfo } from "../redux/actions/user";
import ButtonCustom from "./ButtonCustom";
import Modal from "./Modal";
import addFile from "../resources/images/add-file.svg";
import { callApi } from "../axios";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AlertDialog from "./Dialog/AlertDialog";
import { useHistory } from "react-router";
const useStyles = makeStyles({
    textField: {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px"
        },
        marginBottom: "32px",
    },
    rightTabContainer: {
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "20px"
    },
    input: {
        display: "none"
    },
    datePicker: {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px"
        },
        marginBottom: "32px",
    }
})
const Profile = ({ getUserInfo = () => { }, userReducer, role, status }) => {
    console.log("xxx status ", status)
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        cardId: "",
        address: "",
        personImage: null,
        idCardImage: null,
        birthday: new Date().toLocaleDateString(),
    })
    const [error, setError] = useState({
        errorType: "",
        errorMessage: ""
    })
    useEffect(() => {
        if (userReducer.infoUser) {
            setInput({ ...input, ...userReducer.infoUser })
        } else {
            getUserInfo()
        }
    }, [getUserInfo, userReducer.infoUser])
    const handleOnChange = (event, field) => {
        return setInput({
            ...input,
            [field]: event.target.value
        })
    }
    if (userReducer.loading) {
        return <Modal show={true}></Modal>
    }
    const handleUpdateProfile = async (event) => {
        setLoading(true);
        event.preventDefault()
        let form = new FormData();
        for (let item in input) {
            form.append(`${item}`, input[item])
        }
        await callApi({ url: "/api/user/verify-account", data: form, checkAuth: true, token: localStorage.getItem("_user") })
            .then(res => {

            })
            .catch(err => {

                setError({ ...err.response.data })
                console.log(error)
            });
        setLoading(false);
        setOpenDialog(true);

    }
    console.log("xxxx input", input.idCardImage ? input.idCardImage.name : "12333");
    console.log("xxxx input", input);

    return (
        <div style={{ padding: isMobile ? "20px" : "20px 40px 0px 40px" }}>
            {openDialog || status === 1 ? <AlertDialog description={"Yêu cầu của bạn đã được gửi đi vui lòng đợi chấp thuận"} title={"Yêu cầu trở thành người cho thuê"} close={() => history.push("/")} isVerify={true}></AlertDialog> : null}
            <Modal show={loading}></Modal>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Trở thành người cho thuê</h2>
            <form encType="multipart/form-data" onSubmit={(event) => handleUpdateProfile(event)} >
                <Grid container style={{ marginBottom: "60px" }}>
                    <Grid item xs={isMobile ? 12 : 8} className={classes.rightTabContainer}>
                        <div style={{ marginBottom: "20px", fontSize: "18px", fontWeight: 500 }}>Thông tin cơ bản</div>
                        <Grid container>
                            {ConfigInput.listInforProfile.map(el => (
                                <Grid item xs={isMobile ? 12 : 6} key={el.label}>
                                    <TextField variant="outlined"
                                        label={el.label}
                                        type={el.type}
                                        value={input[el.stateName] ? input[el.stateName] : ""}
                                        disabled={role == 2 ? true : false}
                                        className={classes.textField}
                                        error={error.errorType === el.stateName ? true : false}
                                        helperText={error.errorType === el.stateName ? error.errorMessage : ""}
                                        style={{ width: "90%" }}
                                        onChange={(event) => handleOnChange(event, el.stateName)}>
                                    </TextField>
                                </Grid>
                            ))}
                        </Grid>
                        <div style={{ marginBottom: "20px", fontSize: "18px", fontWeight: 500 }}>Xác minh tài khoản</div>
                        <Grid container>
                            {ConfigInput.verifyAccount.map(el => (
                                <Grid item xs={isMobile ? 12 : 6} key={el.label}>
                                    <TextField variant="outlined"
                                        label={el.label}
                                        type={el.type}
                                        value={input[el.stateName] ? input[el.stateName] : ""}
                                        disabled={role == 2 ? true : false}
                                        className={classes.textField}
                                        error={error.errorType === el.stateName ? true : false}
                                        helperText={error.errorType === el.stateName ? error.errorMessage : ""}
                                        style={{ width: "90%" }}
                                        onChange={(event) => handleOnChange(event, el.stateName)}>
                                    </TextField>
                                </Grid>
                            ))}
                            <Grid item xs={isMobile ? 12 : 6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker
                                        disableToolbar
                                        style={{ width: "90%" }}
                                        className={classes.textField}
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        label="Ngày sinh"
                                        variant="inline"
                                        disabled={role == 2 ? true : false}
                                        value={input.birthday}
                                        onChange={(date) => setInput({ ...input, birthday: date })}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: "20px" }}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={(event) => {
                                    setInput({
                                        ...input,
                                        idCardImage: event.target.files[0],
                                        idCardImagePath: event.target.files[0] ? event.target.files[0].name : null
                                    })
                                }}
                            />
                            <Card style={{ borderRadius: "20px" }}>
                                <CardActionArea style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <label htmlFor="contained-button-file">
                                        <div style={{ fontSize: "16px", padding: "20px", borderBottom: "1px solid #0000001f", }}>Ảnh chứng minh thư</div>
                                        <CardMedia style={{ padding: "20px", maxWidth: "90%", marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" }} >
                                            <div style={{ display: "flex", border: "1px dashed #0000001f", padding: "20px" }}>
                                                <img src={addFile} height="100px" alt="add-image-icon"></img>
                                                <div >
                                                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>Chọn ảnh</div>
                                                    <div>Thả ảnh vào đây hoặc là ấn vào đây để chọn ảnh từ máy của bạn</div>
                                                </div>
                                            </div>
                                        </CardMedia>
                                    </label>
                                    <span style={{ fontSize: "14px", marginLeft: "40px", marginBottom: "16px" }}>Lưu ý : Bạn phải chụp ảnh không được mờ </span>

                                    {input.idCardImage ? <div style={{ margin: "20px 40px", display: "flex", flexDirection: "column" }}>{input.idCardImage.name}</div> : null}
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <ButtonCustom disabled={role === 2 ? true : false} type="submit" >Update Profile</ButtonCustom>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 3} style={{ backgroundColor: "#fff", marginLeft: "auto", marginRight: "auto", borderRadius: "20px", height: "100%", padding: "16px", marginTop: isMobile ? "16px" : "" }}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="button-file"
                            type="file"
                            disabled={role === 2 ? true : false}
                            onChange={(event) => {
                                setInput({
                                    ...input,
                                    personImage: event.target.files[0],
                                    personImagePath: event.target.files[0] ? event.target.files[0].name : null
                                })
                            }}
                        />
                        <div style={{ margin: "8px 0px 16px 8px", fontSize: "18px", fontWeight: 600 }}>Ảnh</div>

                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <img src="https://demo5.wpresidence.net/wp-content/themes/wpresidence/img/default_user.png" alt="avatar-3" style={{ marginBottom: "32px", width: "100%", height: "auto" }}></img>
                            <label htmlFor="button-file">
                                <Button disabled={role === 2 ? true : false} component="div" style={{ textTransform: "none", backgroundColor: role === 2 ? "rgba(0, 0, 0, 0.12)" : "#ae8c63", color: role === 2 ? "rgba(0, 0, 0, 0.26)" : "#fff", padding: "16px 24px", borderRadius: "10px", width: "100%" }}
                                    variant="contained" >Tải ảnh lên</Button>
                            </label>
                            {input.personImage ? <div style={{ margin: "20px 40px", display: "flex", flexDirection: "column" }}>{input.personImage.name}</div> : null}
                        </div>
                    </Grid>
                </Grid>

            </form>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)