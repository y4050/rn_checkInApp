import * as actions from "./actionTypes";

let lastStudentId = 0;

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_STUDENT:
      return [...state, { data: action.payload.data, id: lastStudentId++ }];
    default:
      return state;
  }
};
export default studentReducer;
