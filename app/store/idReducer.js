import * as actions from "./actionTypes";

let counter = 0;

const idReducer = (state = counter, action) => {
  switch (action.type) {
    case actions.ADD_ID:
      return state + 1;

    default:
      return state;
  }
};
export default idReducer;
