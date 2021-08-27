import * as actions from "./actionTypes";

const newsReducer = (state = "", action) => {
  switch (action.type) {
    case actions.UPDATE_NEWS:
      return action.payload.data;

    default:
      return state;
  }
};
export default newsReducer;
