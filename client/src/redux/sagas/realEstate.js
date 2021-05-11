import { call, put, take } from 'redux-saga/effects';
import * as Types from "../actions/type";
import { callApi } from "../../axios/index"
import { addFavoritesFailed, addFavoritesSuccess, adjustApartmentFailed, adjustApartmentSuccess, adminApprovePropertyFailed, adminApprovePropertySuccess, adminRejectAccountFailed, adminRejectAccountSuccess, adminRejectPropertyFailed, adminRejectPropertySuccess, getListFavoritesFailed, getListFavoritesSuccess, getListLandingPageFailed, getListLandingPageSuccess, getListRealEstateFailed, getListRealEstateSuccess, getMyListPropertyFailed, getMyListPropertySuccess, getPropertyFailed, getPropertySuccess, removeApartmentFailed, removeApartmentSuccess, removeFavoritesFailed, removeFavoritesSuccess, searchPropertyFailed, searchPropertySuccess, updateApartment, updateApartmentFailed, updateApartmentSuccess } from '../actions/action';
function getListLandingPageApi() {
    return callApi({ url: "/api/apartment/get-list-landingpage", method: "get" })
}
function addFavoritesApi(token, id) {
    return callApi({ url: "/api/user/add-favorites", token: token, checkAuth: true, data: { id: id } })
}
function removeFavoritesApi(token, id) {
    return callApi({ url: "/api/user/remove-favorites", token: token, checkAuth: true, data: { id: id } })
}
function getListFavoritesApi(token) {
    return callApi({ url: "/api/apartment/get-list-favorites", token: token, checkAuth: true })
}
function getListRealEstateApi(token) {
    return callApi({ url: "/api/apartment/get-list-not-approve", checkAuth: true, token: token })
}
function getPropertyApi(id) {
    return callApi({ url: "/api/apartment/get-property", data: { id: id } })
}
function searchPropertyApi(query) {
    return callApi({ url: "/api/apartment/search-property", data: query })
}
function getMyListPropertyApi(token) {
    return callApi({ url: "/api/apartment/get-list-property", token: token, checkAuth: true })
}
async function adminApprovePropertyApi(token, id) {
    let result
    await callApi({ url: "/api/apartment/admin-approve-property", token: token, checkAuth: true, data: { id: id } }).then(res => {
        result = res
    })
    return result
}
function adminRejectPropertyApi(token, id) {
    return callApi({ url: "/api/apartment/admin-reject-property", token: token, checkAuth: true, data: { id: id } })
}
function adjustApartmentApi(id) {
    return callApi({ url: "/api/apartment/adjust-apartment", checkAuth: false, data: { id: id } })
}
function removeApartmentApi(id) {
    return callApi({ url: "/api/apartment/remove-apartment", checkAuth: false, data: { id: id } })
}
function updateApartmentApi(id, property) {
    return callApi({ url: "/api/apartment/update-apartment", checkAuth: false, data: { id: id, property: property } })
}
function* getListLandingPageSaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_LIST_LADNING_PAGE);
            let listRealEstate = yield call(getListLandingPageApi);
            if (listRealEstate) {
                yield put(getListLandingPageSuccess(listRealEstate))
            }
        }
        catch (e) {
            yield put(getListLandingPageFailed(e))
        }
    }
}
function* addFavorites() {
    while (true) {
        try {
            let action = yield take(Types.ADD_FAVORITES);
            let id = action.id
            console.log("id", id)
            let token = localStorage.getItem("_user");
            if (id && token) {
                let response = yield call(addFavoritesApi, token, id)
                if (response === "success") {
                    yield put(addFavoritesSuccess(id))
                }
            }
        }
        catch (e) {
            yield put(addFavoritesFailed(e))
        }
    }
}
function* getListFavorites() {
    while (true) {
        try {
            let action = yield take(Types.GET_LIST_FAVORITES);
            let token = localStorage.getItem("_user");
            let response = yield call(getListFavoritesApi, token);
            console.log("running outside")
            if (response) {
                console.log("running inside")
                yield put(getListFavoritesSuccess(response))
            }
        }
        catch (error) {
            yield put(getListFavoritesFailed(error))
        }
    }
}
function* getListRealEstate() {
    while (true) {
        try {
            let action = yield take(Types.GET_LIST_REAL_ESTATES);
            let token = localStorage.getItem("_user");
            let response = yield call(getListRealEstateApi, token)
            if (response) {
                yield put(getListRealEstateSuccess(response))
            }
        }
        catch (error) {
            yield put(getListRealEstateFailed(error))
        }
    }
}
function* getPropertySaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_PROPERTY);
            let response = yield call(getPropertyApi, action.id);
            if (response) {
                yield put(getPropertySuccess(response))
            }
        }
        catch (error) {
            yield put(getPropertyFailed(error))
        }
    }
}
function* searchPropertySaga() {
    while (true) {
        try {
            let action = yield take(Types.SEARCH_PROPERTY);
            console.log(action.query, "xx query")
            let response = yield call(searchPropertyApi, action.query);
            if (response) {
                yield put(searchPropertySuccess(response))
            }
        }
        catch (error) {
            yield put(searchPropertyFailed(error))
        }
    }
}
function* getMyListPropertySaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_MY_LIST_PROPERTY);
            let token = localStorage.getItem("_user")
            let response = yield call(getMyListPropertyApi, token);
            if (response) {
                yield put(getMyListPropertySuccess(response))
            }
        }
        catch (error) {
            yield put(getMyListPropertyFailed(error))
        }
    }
}
function* removeFavorites() {
    while (true) {
        try {
            let action = yield take(Types.REMOVE_FAVORITES);
            let id = action.id
            console.log("id", id)
            let token = localStorage.getItem("_user");
            if (id && token) {
                let response = yield call(removeFavoritesApi, token, id)
                if (response === "success") {
                    yield put(removeFavoritesSuccess(id))
                }
            }
        }
        catch (e) {
            yield put(removeFavoritesFailed(e))
        }
    }
}
function* adminApprovePropertySaga() {
    while (true) {
        try {
            let action = yield take(Types.ADMIN_APPROVE_PROPERTY);
            let id = action.id
            console.log("id", id)
            let token = localStorage.getItem("_user");
            if (id && token) {
                let response = yield call(adminApprovePropertyApi, token, id);
                console.log("xxx response ", response)
                if (response === "success") {
                    yield put(adminApprovePropertySuccess())
                }
            }
        }
        catch (e) {
            yield put(adminApprovePropertyFailed(e))
        }
    }
}

function* adminRejectPropertySaga() {
    while (true) {
        try {
            let action = yield take(Types.ADMIN_REJECT_PROPERTY);
            let id = action.id
            console.log("id", id)
            let token = localStorage.getItem("_user");
            if (id && token) {
                let response = yield call(adminRejectPropertyApi, token, id)
                if (response === "success") {
                    yield put(adminRejectPropertySuccess())
                }
            }
        }
        catch (e) {
            yield put(adminRejectPropertyFailed(e))
        }
    }
}
function* adjustApartmentSaga() {
    while (true) {
        try {
            let action = yield take(Types.ADJUST_APARTMENT);
            let id = action.id
            if (id) {
                let res = yield call(adjustApartmentApi, id);
                if (res) {
                    yield put(adjustApartmentSuccess(res))
                }
            }
        }
        catch (error) {
            yield put(adjustApartmentFailed(error))
        }
    }
}
function* removeApartmentSaga() {
    while (true) {
        try {
            let action = yield take(Types.REMOVE_APARTMENT);
            let id = action.id
            if (id) {
                let res = yield call(removeApartmentApi, id);
                if (res == "success") {
                    yield put(removeApartmentSuccess())
                }
            }
        }
        catch (error) {
            yield put(removeApartmentFailed(error))
        }
    }
}
function* updateApartmentSaga() {
    while (true) {
        try {
            let action = yield take(Types.UPDATE_APARTMENT);
            let id = action.id;
            console.log("xxxx id ", action.id)
            if (id) {
                let res = yield call(updateApartmentApi, id, action.property);
                console.log("res", res);
                if (res === "success") {
                    yield put(updateApartmentSuccess())
                    window.location.reload()
                }
            }
        }
        catch (error) {
            yield put(updateApartmentFailed(error))
        }
    }
}
export const realEstateSaga = [
    getListLandingPageSaga(),
    addFavorites(),
    getListFavorites(),
    getListRealEstate(),
    getPropertySaga(),
    searchPropertySaga(),
    getMyListPropertySaga(),
    removeFavorites(),
    adminApprovePropertySaga(),
    adminRejectPropertySaga(),
    adjustApartmentSaga(),
    removeApartmentSaga(),
    updateApartmentSaga()
]