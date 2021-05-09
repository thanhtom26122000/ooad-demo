import { call, put, take } from 'redux-saga/effects';
import * as Types from "../actions/type";
import { callApi } from "../../axios/index"
import { setImagePathAndStatus, setIsAuth } from '../actions/action';
function checkAuthApi(token) {
    return callApi({ url: "/api/user/check-auth", token: token, checkAuth: true })
}
function* checkIsLoginSaga() {
    while (true) {
        try {
            let action = yield take(Types.CHECK_IS_LOG_IN);
            let token = localStorage.getItem("_user");
            if (token) {
                console.log("123 running")
                let temp = yield call(checkAuthApi, token);
                console.log("xxx123", temp)
                if (temp.message !== "success") {
                    yield put(setIsAuth(false))
                } else {
                    yield put(setIsAuth(true));
                    yield put(setImagePathAndStatus(temp))
                }
            } else {
                yield put(setIsAuth(false))
            }
        }
        catch (e) {
            yield put(setIsAuth(false))
        }
    }

}
export const authSaga = [
    checkIsLoginSaga(),
]