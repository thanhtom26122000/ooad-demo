import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import adminReducer from "./admin"
import realEstateReducer from "./realEstate";
const rootReducer = combineReducers({
    authReducer: authReducer,
    userReducer: userReducer,
    adminReducer: adminReducer,
    realEstateReducer: realEstateReducer
})
export default rootReducer