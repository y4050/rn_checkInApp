import * as actions from "./actionTypes";

// const getId = () => {
//   if (store.getState().classes == null) {
//     return 0;
//   } else {
//     return store.getState().classes[0].id + 1;
//   }
// };

// let lastClassId = getId();

// let lastClassId = 0;

const classReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_CLASS:
      return [
        {
          id: action.payload.id,
          day: action.payload.day,
          date: action.payload.date,
          time: action.payload.time,
          className: action.payload.className,
          teacher: action.payload.teacher,
          level: action.payload.level,
          duration: action.payload.duration,
          capacity: action.payload.capacity,
          note: action.payload.note,
          count: action.payload.capacity,
          checkedIn: [],
        },
        ...state,
      ];
    case actions.ADD_CLASSRE:
      return [
        {
          id: action.payload.id,
          day: action.payload.day,
          date: action.payload.date,
          time: action.payload.time,
          className: action.payload.className,
          teacher: action.payload.teacher,
          level: action.payload.level,
          duration: action.payload.duration,
          capacity: action.payload.capacity,
          note: action.payload.note,
          count: action.payload.capacity,
          checkedIn: [],
        },
        ...state,
      ];
    case actions.UPDATE_DATE_CHECKIN:
      // return console.log("?>>>>>", action.payload);
      return state.map((target) =>
        target.id !== action.payload.id
          ? target
          : {
              ...target,
              date: action.payload.date,
              checkedIn: [],
            }
      );
    case actions.EDIT_CLASS:
      // return console.log("?>>>>>", action.payload);
      return state.map((target) =>
        target.id !== action.payload.id
          ? target
          : {
              ...target,
              date: action.payload.date,
              time: action.payload.time,
              className: action.payload.className,
              teacher: action.payload.teacher,
              level: action.payload.level,
              duration: action.payload.duration,
              capacity: action.payload.capacity,
              note: action.payload.note,
            }
      );
    case actions.EDIT_CLASSRE:
      // return console.log("?>>>>>", action.payload);
      return state.map((target) =>
        target.id !== action.payload.id
          ? target
          : {
              ...target,
              day: action.payload.day,
              date: action.payload.date,
              time: action.payload.time,
              className: action.payload.className,
              teacher: action.payload.teacher,
              level: action.payload.level,
              duration: action.payload.duration,
              capacity: action.payload.capacity,
              note: action.payload.note,
            }
      );

    case actions.DELETE_CLASS:
      return state.filter((target) => target.id !== action.payload);

    // Check In
    case actions.CHECK_IN:
      return state.map((target) =>
        target.id !== action.payload.id
          ? target
          : // : console.log("target >>>", action.payload)
            { ...target, checkedIn: [...target.checkedIn, action.payload.code] }
      );

    case actions.DELETE_CHECK_IN:
      return state.map(
        (target) =>
          target.id !== action.payload.id
            ? target
            : {
                ...target,
                checkedIn: target.checkedIn.filter(
                  (student) => student !== action.payload.code
                ),
              }
        // : target.checkedIn.filter(
        //     (student) => student !== action.payload.code
        //   )
      );

    default:
      return state;
  }
};
export default classReducer;
