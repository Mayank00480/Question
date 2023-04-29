import { combineReducers } from "redux";
import authReducer from './auth'
import currentUserReducer from './currentUser'
import questionReducer from './questions'
export default  combineReducers({authReducer , currentUserReducer ,questionReducer}) 