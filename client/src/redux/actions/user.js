import * as Types from "./type"
export const getUserInfo = () => {
    return {
        type: Types.GET_USER_INFO,
    }
}
export const getUserInfoSuccess = (userInfo) => {
    return {
        type: Types.GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}
export const getUserInfoFailed = (error) => {
    return {
        type: Types.GET_USER_INFO_FAILED,
        error: error
    }
}
export const getAdminInfo = () => {
    return {
        type: Types.GET_ADMIN_INFO
    }
}
export const getAdminInfoSuccess = (result) => {
    return {
        type: Types.GET_ADMIN_INFO_SUCCESS,
        result: result
    }
}
export const getListAccount = () => {
    return {
        type: Types.GET_LIST_ACCOUNT,
    }
}
export const getListAccountSuccess = (result) => {
    return {
        type: Types.GET_LIST_ACCOUNT_SUCCESS,
        listAccount: result
    }
}
export const getListAccountFailed = (error) => {
    return {
        type: Types.GET_LIST_ACCOUNT_FAILED,
        error: error
    }
}
export const getMyListProperty = () => {
    return {
        type: Types.GET_MY_LIST_PROPERTY,

    }
}
export const getMyListPropertySuccess = (listRealEstate) => {
    return {
        type: Types.GET_MY_LIST_PROPERTY_SUCCESS,
        listRealEstate: listRealEstate
    }
}
export const getMyListPropertyFailed = (error) => {
    return {
        type: Types.GET_MY_LIST_PROPERTY_FAILED,
        error: error
    }
}
export const updateUser = () => {
    return {
        type: Types.UPDATE_USER
    }
}
export const adminApproveAccount = (id) => {
    return {
        type: Types.ADMIN_APPROVE_ACCOUNT,
        id: id
    }
}
export const adminApproveAccountSuccess = () => {
    return {
        type: Types.ADMIN_APPROVE_ACCOUNT_SUCCESS,
    }
}
export const adminApproveAccountFailed = (error) => {
    return {
        type: Types.ADMIN_APPROVE_ACCOUNT_FAILED,
        error: error
    }
}