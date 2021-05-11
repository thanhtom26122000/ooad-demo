import * as Types from "../actions/type"
const initState = {
    loading: false,
    error: null,
    listRealEstate: [],
    property: {},
}
const realEstateReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.GET_LIST_LADNING_PAGE: {
            return { ...state, loading: true }
        }
        case Types.GET_LIST_LADNING_PAGE_SUCCESS: {
            return { ...state, listRealEstate: [...action.listRealEstate], loading: false }
        }
        case Types.GET_LIST_LADNING_PAGE_FAILED: {
            return { ...state, error: action.error, loading: false }
        }
        case Types.ADD_FAVORITES: {
            return { ...state, loading: true }
        }
        case Types.ADD_FAVORITES_SUCCESS: {

            return { ...state, loading: false }
        }
        case Types.ADD_FAVORITES_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.REMOVE_FAVORITES: {
            return { ...state, loading: true }
        }
        case Types.REMOVE_FAVORITES_SUCCESS: {

            return { ...state, loading: false }
        }
        case Types.REMOVE_FAVORITES_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.GET_LIST_FAVORITES: {
            return { ...state, loading: true }
        }
        case Types.GET_LIST_FAVORITES_SUCCESS: {
            return { ...state, loading: false, listRealEstate: [...action.listRealEstate] }
        }
        case Types.GET_LIST_FAVORITES_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.GET_LIST_REAL_ESTATES: {
            return { ...state, loading: true }
        }
        case Types.GET_LIST_REAL_ESTATES_SUCCESS: {
            return { ...state, listRealEstate: [...action.listRealEstate], loading: false, error: null }
        }
        case Types.GET_LIST_REAL_ESTATES_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.GET_PROPERTY: {
            return { ...state, loading: true }
        }
        case Types.GET_PROPERTY_SUCCESS: {
            return { ...state, loading: false, error: null, property: { ...action.property } }
        }
        case Types.GET_PROPERTY_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.SEARCH_PROPERTY: {
            return { ...state, loading: true }
        }
        case Types.SEARCH_PROPERTY_SUCCESS: {
            return { ...state, loading: false, listRealEstate: [...action.listRealEstate], error: null }
        }
        case Types.SEARCH_PROPERTY_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.GET_MY_LIST_PROPERTY: {
            return { ...state, loading: true }
        }
        case Types.GET_MY_LIST_PROPERTY_SUCCESS: {
            return { ...state, loading: false, error: null, listRealEstate: [...action.listRealEstate] }
        }
        case Types.GET_MY_LIST_PROPERTY_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.ADMIN_APPROVE_PROPERTY: {
            return { ...state, loading: true }
        }
        case Types.ADMIN_APPROVE_PROPERTY_SUCCESS: {
            return { ...state, loading: false, error: null }
        }
        case Types.ADMIN_APPROVE_PROPERTY_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.ADMIN_REJECT_PROPERTY: {
            return { ...state, loading: true }
        }
        case Types.ADMIN_REJECT_PROPERTY_SUCCESS: {
            return { ...state, loading: false, error: null }
        }
        case Types.ADMIN_REJECT_PROPERTY_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        case Types.ADJUST_APARTMENT: {
            return { ...state, loading: true }
        }
        case Types.ADJUST_APARTMENT_FAILED: {
            return { ...state, error: action.error }
        }
        case Types.ADJUST_APARTMENT_SUCCESS: {
            return { ...state, property: { ...action.property }, loading: false, error: null }
        }
        case Types.REMOVE_APARTMENT: {
            return { ...state, loading: true }
        }
        case Types.REMOVE_APARTMENT_FAILED: {
            return { ...state, error: action.error }
        }
        case Types.REMOVE_APARTMENT_SUCCESS: {
            return { ...state, loading: false, error: null }
        }
        case Types.UPDATE_APARTMENT: {
            return { ...state, loading: true }
        }
        case Types.UPDATE_APARTMENT_SUCCESS: {
            return { ...state, loading: false, property: {} }
        }
        case Types.UPDATE_APARTMENT_FAILED: {
            return { ...state, loading: false, error: action.error }
        }
        default: return state
    }
}
export default realEstateReducer