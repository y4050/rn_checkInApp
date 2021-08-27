// can only use one defaul export, on reducer, but has two reducers


// ***************** actionTypes *****************

// const ADD_CLASS = "ADD_CLASS";
// const EDIT_CLASS = "EDIT_CLASS";
// const DELETE_CLASS = "DELETE_CLASS";
// const CHECK_IN = "CHECK_IN";
// const DELETE_CHECK_IN = "DELETE_CHECK_IN";
// const ADD_STUDENT = "ADD_STUDENT";
// const EDIT_STUDENT = "EDIT_STUDENT";
// const DELETE_STUDENT = "DELETE_STUDENT";

// ***************** actions *****************

export const ADD_CLASS = (date, className, time, duration, capacity, note) => ({
  type: ADD_CLASS,
  payload: {
    date,
    className,
    time,
    duration,
    capacity,
    note,
  },
});

export const EDIT_CLASS = (
  date,
  className,
  time,
  duration,
  capacity,
  note
) => ({
  type: EDIT_CLASS,
  payload: {
    date,
    className,
    time,
    duration,
    capacity,
    note,
  },
});

export const DELETE_CLASS = (id) => ({
  type: DELETE_CLASS,
  payload: id,
});

// ***************** reducers *****************
// ***************** class reducer *****************

let lastClassId = 0;

const classReducer = (state = [], action) => {
    switch (action.type) {
      case ADD_CLASS:
        return [
          ...state,
          {
            date: action.payload.date,
            className: action.payload.className,
            time: action.payload.time,
            duration: action.payload.duration,
            capacity: action.payload.capacity,
            note: action.payload.note,
            id: lastClassId++,
          },
        ];
      case DELETE_CLASS:
        return state.filter((target) => target.id !== action.payload);
      default:
        return state;
    }
  };
  export default classReducer;


  // ***************** student reducer *****************

let lastStudentId = 0;

const studentReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, { data: action.payload.data, id: lastStudentId++ }];
    default:
      return state;
  }
};
export default studentReducer;
