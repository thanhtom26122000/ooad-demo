import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMyListProperty } from "../redux/actions/user";
import CustomTable from "./CustomTable";
import ConfigInput from "../ConfigInput"
import { adjustApartment, removeApartment } from "../redux/actions/realEstate";
const useStyles = makeStyles({
    textField: {
        "& .MuiOutlinedInput-root": {
            borderRadius: "10px"
        },
        marginBottom: "32px",
    },
    input: {
        display: "none"
    },
    rightTabContainer: {
        padding: "40px !important",
        backgroundColor: "#fff",
        borderRadius: "20px",
    }
})
const ListPropery = ({ getMyListProperty = () => { }, realEstateReducer, adjustApartment = () => { }, removeApartment = () => { } }) => {
    const classes = useStyles()
    useEffect(() => {
        getMyListProperty()
    }, [getMyListProperty]);
    const [filter, setFilter] = useState(-1);
    let listRealEstate = []
    if (filter >= 0 && realEstateReducer.listRealEstate) {
        listRealEstate = realEstateReducer.listRealEstate.filter(el => {
            return el.isApprove === filter
        })
    }
    let button = [{ label: "Sửa", disable: false, primary: "primary", click: (id) => adjustApartment(id) },
    { label: "Xoá", disable: false, primary: "secondary", click: (id) => removeApartment(id) }]


    console.log("xxxx", realEstateReducer.listRealEstate)
    return (
        <div style={{ padding: "20px 40px 0px 40px" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Danh Sách phòng</h2>
            <FormControl variant="outlined" style={{ width: "200px", marginBottom: "40px" }}>
                <InputLabel>Bộ Lọc</InputLabel>
                <Select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    label="Bộ Lọc"
                    style={{ borderRadius: "10px" }}>
                    {ConfigInput.filterListProperty.map((value, index) => {
                        return (
                            <MenuItem key={value} value={index - 1}>{value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <CustomTable rows={filter >= 0 ? listRealEstate : realEstateReducer.listRealEstate} config="tabelListProperty" button={button}></CustomTable>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        realEstateReducer: state.realEstateReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMyListProperty: () => dispatch(getMyListProperty()),
        adjustApartment: (id) => dispatch(adjustApartment(id)),
        removeApartment: (id) => dispatch(removeApartment(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPropery)