import { call, put, take } from 'redux-saga/effects';
import { callApi } from '../../axios';
import * as Types from "../actions/type"
import { getAdminInfoSuccess, adminApproveAccountFailed, adminApproveAccountSuccess, getListAccountFailed, getListAccountSuccess, getUserInfoFailed, getUserInfoSuccess } from '../actions/user';
function getUserApi(token) {
    return callApi({ method: "get", token: token, checkAuth: true, url: "/api/user/user-info" })
}
function getAdminInfoApi() {
    return callApi({ url: "/admin/get-info" })
}
function getListAccountApi(token) {
    return callApi({ url: "/api/user/get-list-account", token: token, checkAuth: true })
}
function adminApproveAccountApi(token, id) {
    return callApi({ url: "/api/user/admin-approve-account", token: token, checkAuth: true, data: { id: id } })
}
function* getUserSaga() {
    while (true) {
        let action = yield take(Types.GET_USER_INFO);
        try {
            let token = localStorage.getItem("_user");
            let user = yield call(getUserApi, token);
            console.log("xxxx user", user)
            if (user !== "failed") {
                yield put(getUserInfoSuccess(user))
            }
        }
        catch (e) {
            yield put(getUserInfoFailed(e))
        }
    }
}
function* getAdminInfo() {
    while (true) {
        let action = yield take(Types.GET_ADMIN_INFO);
        try {
            let result = yield call(getAdminInfoApi);
            yield put(getAdminInfoSuccess(result))
        }
        catch (e) {
        }
    }
}
function* getListAccountSaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_LIST_ACCOUNT);
            let token = localStorage.getItem("_user");
            if (token) {
                let response = yield call(getListAccountApi, token)
                if (response) {
                    yield put(getListAccountSuccess(response))
                }
            }
        }
        catch (error) {
            yield put(getListAccountFailed(error))
        }
    }
}
function* adminApproveAccountSaga() {
    while (true) {
        try {
            let action = yield take(Types.ADMIN_APPROVE_ACCOUNT);
            let id = action.id
            console.log("id", id)
            let token = localStorage.getItem("_user");
            if (id && token) {
                let response = yield call(adminApproveAccountApi, token, id)
                if (response === "success") {
                    yield put(adminApproveAccountSuccess())
                    window.location.reload()
                }
            }
        }
        catch (e) {
            yield put(adminApproveAccountFailed(e))
        }
    }
}
export const userSaga = [
    getUserSaga(),
    getAdminInfo(),
    getListAccountSaga(),
    adminApproveAccountSaga(),

]