import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { realEstateSaga } from "./realEstate"
export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...userSaga,
        ...realEstateSaga,
    ]);
}