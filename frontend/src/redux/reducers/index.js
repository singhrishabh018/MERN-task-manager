import { combineReducers } from "redux"
import authReducer from "./authReducer"
import taskReducer from './taskReducers';

const rootReducer = combineReducers({
  authReducer,
  taskReducers
});

export default rootReducer;
