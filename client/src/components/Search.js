import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import ConfigInput from "../ConfigInput";
import { Button, Container, FormControl, InputLabel, makeStyles, MenuItem, Select, Slider, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    select: {
        minWidth: "300px",
        marginRight: "20px"
    }
})
const Search = () => {
    const classes = useStyles();
    const history = useHistory()
    const [input, setInput] = useState({
        state: "",
        district: "",
        typeRealEstate: "",
        bathroom: "",
        price: 0,
        size: "",
    })
    const handleSelectOnChange = (field, value) => {
        setInput({
            ...input,
            [field]: value
        })
    }
    const handleClick = (event) => {
        let link = "/advanced-search?"
        for (let item in input) {
            if (input[item]) {
                if (item === "state") {
                    link += (item + "=" + input[item])
                } else {
                    link += ("&" + item + "=" + input[item])

                }
            }
        }
        console.log("xxx result", link)
        history.push(link);
        window.location.reload()
    }
    return (
        <Container style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", }}>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start", width: "100%", alignItems: "center" }}>
                <div >
                    <div style={{ display: "flex", }}>
                        <Autocomplete
                            options={ConfigInput.listState}
                            className={classes.select}
                            inputValue={input.state ? input.state : ""}
                            onInputChange={(event, value) => handleSelectOnChange("state", value)}
                            renderInput={(params) => <TextField  {...params} label="Tỉnh" variant="outlined" />}
                        />
                        <Autocomplete
                            options={ConfigInput.mapDistrict[input.state] ? ConfigInput.mapDistrict[input.state] : []}
                            className={classes.select}
                            inputValue={input.district ? input.district : ""}
                            onInputChange={(event, value) => handleSelectOnChange("district", value)}
                            renderInput={(params) => <TextField {...params} label="Quận/Huyện" variant="outlined" />}
                        />
                        <FormControl variant="outlined" className={classes.select} >
                            <InputLabel>Diện tích</InputLabel>
                            <Select
                                onChange={(event) => setInput({ ...input, size: event.target.value })}
                                label="Diện tích"
                                value={input.size ? input.size : ""}
                                style={{ width: "90%" }}>
                                {ConfigInput.selectPrice.map(value => {
                                    return (
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                    </div>
                    <div style={{ marginTop: "16px", display: "flex" }}>
                        <TextField
                            label="Số giường ngủ"
                            variant="outlined"
                            type="number"
                            className={classes.select}
                            value={input.bathroom}
                            onChange={(event) => setInput({ ...input, bathroom: event.target.value })}>
                        </TextField>
                        <div style={{ width: "40%" }}>
                            <Typography gutterBottom>
                                Giá tiền : <span style={{ fontSize: "16px", fontWeight: 600 }}>Từ {input.price + (input.price === 0 ? "" : ".000.000")} VND đến 100.000.000 VND</span>
                            </Typography>
                            <Slider value={input.price} onChange={(event, value) => setInput({ ...input, price: value })} min={0} max={100} ></Slider>
                        </div>
                    </div>
                </div>
                <div style={{ height: "100%", width: "100%" }}>
                    <Button style={{ height: "90%", backgroundColor: "#ae8c63", color: "#fff", width: "100%", fontSize: "18px" }}
                        onClick={(event) => handleClick(event)}>TÌM KIẾM</Button>
                </div>
            </div>
            {/* <Slider value={input.price} onChange={(event, value) => setInput({ ...input, price: value })} aria-labelledby="continuous-slider" /> */}
        </Container>
    )
}
export default React.memo(Search)