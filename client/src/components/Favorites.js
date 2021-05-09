import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getListFavorites, removeFavorites } from "../redux/actions/action";
import CustomTable from "./CustomTable"
import Modal from "./Modal";
const Favorites = ({ realEstateReducer, getListFavorites = () => { }, removeFavorites = () => { } }) => {
    useEffect(() => {
        getListFavorites()
    }, [getListFavorites, removeFavorites])
    if (realEstateReducer.loading) {
        return <Modal show={realEstateReducer.loading}></Modal>
    }
    let button = [{ label: "Xoá", disable: false, primary: "secondary", click: (id) => removeFavorites(id) }]
    return (
        <div style={{ padding: "20px 40px 0px 40px" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Yêu thích</h2>
            {realEstateReducer.listRealEstate.length > 0 ?
                <CustomTable button={button} config="tableFavo" rows={realEstateReducer.listRealEstate}></CustomTable>
                :
                <h3>Bạn chưa thích phòng nào!</h3>
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
        getListFavorites: () => dispatch(getListFavorites()),
        removeFavorites: (id) => dispatch(removeFavorites(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites)