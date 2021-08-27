import * as actions from "./actionTypes";

const passReducer = (state = "0000", action) => {
  switch (action.type) {
    case actions.CHANGE_PASS:
      return (state = action.payload.pass);
    default:
      return state;
  }
};
export default passReducer;
