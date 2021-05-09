import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfigInput from "../ConfigInput";
import { adminApproveProperty, adminRejectProperty, getListRealEstate } from "../redux/actions/action";
import CustomTable from "./CustomTable";
import Modal from "./Modal";
const ListRealEstate = ({ realEstateReducer, getListRealEstate = () => { }, adminApproveProperty = () => { }, adminRejectProperty = () => { } }) => {
    useEffect(() => {
        getListRealEstate()
    }, [adminApproveProperty, adminRejectProperty])
    console.log("xxxx userReducer", realEstateReducer)
    let button = [{ label: "Duyệt", disable: false, primary: "primary", click: (id) => adminApproveProperty(id) },
    { label: "Từ chối", disable: false, primary: "secondary", click: (id) => adminRejectProperty(id) }]

    const [filter, setFilter] = useState(-1);
    let listRealEstate = []
    if (filter >= 0 && realEstateReducer.listRealEstate) {
        listRealEstate = realEstateReducer.listRealEstate.filter(el => {
            return el.isApprove === filter
        })
    }
    if (realEstateReducer.loading) {
        return <Modal show={realEstateReducer.loading}></Modal>
    }
    return (
        <div style={{ padding: "20px 40px 0px 40px" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Duyệt các phòng</h2>
            <FormControl variant="outlined" style={{ width: "200px", marginBottom: "40px" }}>
                <InputLabel>Bộ Lọc</InputLabel>
                <Select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    label="Bộ Lọc"
                    style={{ borderRadius: "10px" }}>
                    {ConfigInput.filterListRealEstate.map((value, index) => {
                        return (
                            <MenuItem key={value} value={index - 1}>{value}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {realEstateReducer.listRealEstate && realEstateReducer.listRealEstate.length > 0 ?
                <CustomTable button={button} rows={filter >= 0 ? listRealEstate : realEstateReducer.listRealEstate} config="tableRealEstates"></CustomTable>
                :
                <h3>Không có phòng nào cần duyệt!</h3>
            }
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
        getListRealEstate: () => dispatch(getListRealEstate()),
        adminApproveProperty: (id) => dispatch(adminApproveProperty(id)),
        adminRejectProperty: (id) => dispatch(adminRejectProperty(id)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListRealEstate)