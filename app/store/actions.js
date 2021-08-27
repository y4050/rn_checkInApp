import { TouchableOpacityComponent } from "react-native";
import * as actions from "./actionTypes";

export const LOG_IN = () => ({
  type: actions.LOG_IN,
});

export const LOG_OUT = () => ({
  type: actions.LOG_OUT,
});

export const CHANGE_PASS = () => ({
  type: actions.CHANGE_PASS,
});

export const ADD_CLASS = (
  id,
  day,
  date,
  time,
  className,
  teacher,
  level,
  duration,
  capacity,
  note
) => ({
  type: actions.ADD_CLASS,
  payload: {
    id,
    day,
    date,
    time,
    className,
    teacher,
    level,
    duration,
    capacity,
    note,
  },
});
export const ADD_CLASSRE = (
  id,
  day,
  date,
  time,
  className,
  teacher,
  level,
  duration,
  capacity,
  note
) => ({
  type: actions.ADD_CLASSRE,
  payload: {
    id,
    day,
    date,
    time,
    className,
    teacher,
    level,
    duration,
    capacity,
    note,
  },
});

export const UPDATE_DATE_CHECKIN = (id, date) => ({
  type: actions.UPDATE_DATE_CHECKIN,
  payload: {
    id,
    date,
  },
});

export const EDIT_CLASS = (
  id,
  date,
  time,
  className,
  teacher,
  level,
  duration,
  capacity,
  note
) => ({
  type: actions.EDIT_CLASS,
  payload: {
    id,
    date,
    time,
    className,
    teacher,
    level,
    duration,
    capacity,
    note,
  },
});
export const EDIT_CLASSRE = (
  id,
  day,
  date,
  time,
  className,
  teacher,
  level,
  duration,
  capacity,
  note
) => ({
  type: actions.EDIT_CLASSRE,
  payload: {
    id,
    day,
    date,
    time,
    className,
    teacher,
    level,
    duration,
    capacity,
    note,
  },
});

export const DELETE_CLASS = (id) => ({
  type: actions.DELETE_CLASS,
  payload: id,
});

export const CHECK_IN = (id, code) => ({
  type: actions.CHECK_IN,
  payload: {
    id,
    code,
  },
});

export const DELETE_CHECK_IN = (id, code) => ({
  type: actions.DELETE_CHECK_IN,
  payload: {
    id,
    code,
  },
});

export const ADD_LIMIT = () => ({
  type: actions.ADD_LIMIT,
});

export const ADD_ID = () => ({
  type: actions.ADD_ID,
});

export const REDUCE_LIMIT = () => ({
  type: actions.REDUCE_LIMIT,
});

export const UPDATE_NEWS = (data) => ({
  type: actions.UPDATE_NEWS,
  payload: {
    data,
  },
});

export const ADD_NEWS = () => ({
  type: actions.ADD_NEWS,
});

export const RESET_CLASSES = () => ({
  type: actions.RESET_CLASSES,
});
