import * as actions from "./actionTypes";

const userReducer = (state = false, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return (state = true);
    case actions.LOG_OUT:
      return (state = false);
    default:
      return state;
  }
};
export default userReducer;
