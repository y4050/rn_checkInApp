import { combineReducers } from "redux";
import classReducer from "./classReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  classes: classReducer,
  students: studentReducer,
});
