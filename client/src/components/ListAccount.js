import React, { useEffect } from "react";
import { connect } from "react-redux";
import { adminApproveAccount } from "../redux/actions/action";
import { getListAccount } from "../redux/actions/user";
import CustomTable from "./CustomTable";
import Modal from "./Modal";
const ListAccount = ({ userReducer, getListAccount = () => { }, adminApproveAccount = () => { } }) => {
    useEffect(() => {
        getListAccount();
    }, [adminApproveAccount])
    console.log("xxxx userReducer", userReducer)
    let button = [{ label: "Duyệt", disable: false, primary: "primary", click: (id) => adminApproveAccount(id) }]
    return (
        <div style={{ padding: "20px 40px 0px 40px" }}>
            <Modal show={userReducer.loading}></Modal>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Duyệt tài khoản</h2>
            {userReducer.listAccount && userReducer.listAccount.length > 0 ?
                <CustomTable button={button} rows={userReducer.listAccount} config="tableAccount"></CustomTable>
                :
                <h3>Không có người dùng nào cần xác nhận!</h3>
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListAccount: () => dispatch(getListAccount()),
        adminApproveAccount: (id) => dispatch(adminApproveAccount(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAccount)