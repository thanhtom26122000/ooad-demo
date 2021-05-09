import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import ConfigInput from "../ConfigInput";
import { Button, Container, FormControl, InputLabel, makeStyles, MenuItem, Select, Slider, TextField, Typography } from "@material-ui/core";
import ButtonCustom from "./ButtonCustom";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    select: {
        width: "80%",
        marginBottom: "16px"
    }
})
const SearchColumn = () => {
    const classes = useStyles();
    const history = useHistory()
    const [input, setInput] = useState({
        state: "",
        district: "",
        typeRealEstate: "",
        bathroom: "",
        price: 0
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
        history.push(link);
        window.location.reload()
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", backgroundColor: "#fff", boxShadow: " 0 10px 31px 0 rgba(7,152,255,0.09)", }}>
            <div style={{ marginBottom: "16px", fontWeight: 700, fontSize: "18px", marginTop: "16px", color: "#434953", textAlign: "start", }}>Tìm kiếm nâng cao</div>
            <Autocomplete
                options={ConfigInput.listState}
                className={classes.select}
                fullWidth={true}
                inputValue={input.state ? input.state : ""}
                onInputChange={(event, value) => handleSelectOnChange("state", value)}
                renderInput={(params) => <TextField  {...params} className={classes.textField} label="Tỉnh" variant="outlined" />}
            />
            <Autocomplete
                options={ConfigInput.mapDistrict[input.state] ? ConfigInput.mapDistrict[input.state] : []}
                className={classes.select}
                fullWidth={true}
                inputValue={input.district ? input.district : ""}
                onInputChange={(event, value) => handleSelectOnChange("district", value)}
                renderInput={(params) => <TextField {...params} className={classes.textField} label="Quận/Huyện" variant="outlined" />}
            />
            <FormControl variant="outlined" className={classes.select} >
                <InputLabel>Diện tích</InputLabel>
                <Select
                    onChange={(event) => setInput({ ...input, size: event.target.value })}
                    label="Diện tích"
                    value={input.size ? input.size : ""}>
                    {ConfigInput.selectPrice.map(value => {
                        return (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <TextField
                label="Số giường ngủ"
                variant="outlined"
                type="number"
                value={input.bathroom}
                className={classes.select}
                onChange={(event) => setInput({ ...input, bathroom: event.target.value })}>
            </TextField>
            <div className={classes.select}>
                <Typography gutterBottom>
                    Giá tiền : <span style={{ fontSize: "16px", fontWeight: 600 }}>Từ {input.price + (input.price === 0 ? "" : ".000.000")} VND đến 100.000.000 VND</span>
                </Typography>
                <Slider value={input.price} onChange={(event, value) => setInput({ ...input, price: value })} min={1} max={100} ></Slider>
            </div>
            <Button style={{ backgroundColor: "#ae8c63", color: "#fff", width: "80%", marginBottom: "20px" }}
                onClick={(event) => handleClick(event)}>Tìm kiếm</Button>
        </div>
    )
}
export default SearchColumn