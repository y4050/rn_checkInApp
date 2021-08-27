import * as actions from "./actionTypes";

let counter = 1;

const limitReducer = (state = counter, action) => {
  switch (action.type) {
    case actions.ADD_LIMIT:
      return state + 1;

    case actions.REDUCE_LIMIT:
      return state - 1;

    default:
      return state;
  }
};
export default limitReducer;
