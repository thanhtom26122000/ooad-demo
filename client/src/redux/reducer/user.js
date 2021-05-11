import * as Types from "../actions/type";
const initState = {
    infoUser: null,
    loading: false,
    error: null,
    role: null,
    typeAccount: null,
    listAccount: [],
    imagePath: null,
    status: -1
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case (Types.GET_USER_INFO): {
            return { ...state, loading: true }
        }
        case (Types.GET_USER_INFO_SUCCESS): {
            return { ...state, infoUser: { ...action.userInfo }, loading: false, error: null }
        }
        case (Types.GET_USER_INFO_FAILED): {
            return { ...state, error: action.error }
        }
        case Types.SET_IMAGE_PATH_AND_STATUS: {
            return { ...state, imagePath: action.imagePath, loading: false, role: action.role, typeAccount: action.typeAccount, status: action.status }
        }
        case Types.GET_LIST_ACCOUNT: {
            return { ...state, loading: true }
        }
        case Types.GET_LIST_ACCOUNT_SUCCESS: {
            return { ...state, loading: false, error: null, listAccount: [...action.listAccount] }
        }
        case Types.GET_LIST_ACCOUNT_FAILED: {
            return { ...state, loading: false, error: action.error, }
        }
        case Types.ADMIN_APPROVE_ACCOUNT: {
            return { ...state, loading: true }
        }
        case Types.ADMIN_APPROVE_ACCOUNT_SUCCESS: {
            return { ...state, loading: false, error: null }
        }
        case Types.ADMIN_APPROVE_ACCOUNT_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        default: return state
    }
}
export default userReducer