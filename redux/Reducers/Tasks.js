import * as Types from "../Types";
import { HYDRATE } from "next-redux-wrapper";
export const Tasks = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_TASK_FAILED:
    case Types.UPDATE_TASK_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_TASK_REQUESTED:
    case Types.DELETE_TASK_REQUESTED:
    case Types.UPDATE_TASK_REQUESTED:
      return {
        ...state,
        fetching: true,
        loading: true,
      };
    case Types.ADD_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        fetching: false,
        error: "",
      };
    case Types.TOOGLE_TASK:
      const newList = state.tasks.map((item, index) => {
        if (item._id === action.payload) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return { ...state, tasks: [...newList] };
    case Types.UPDATE_TASK_SUCCEEDED:
      const listWithUpdate = state.tasks.map((item, index) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        tasks: [...listWithUpdate],
        loading: false,
        fetching: false,
        error: "",
      };
    case Types.DELETE_TASK_SUCCEEDED:
      const filteredList = state.tasks.filter((item) => {
        if (item._id !== action.payload) {
          return true;
        }
      });
      return {
        ...state,
        tasks: [...filteredList],
        loading: false,
        fetching: false,
        error: "",
      };
    case Types.CLEAR_TASK:
      const idClearedList = state.tasks.filter((item) => {
        if (item.list !== action.payload) {
          return true;
        }
      });
      return {
        ...state,
        tasks: [...idClearedList],
        loading: false,
        error: null,
      };
    case Types.REMOVE_USER:
      return { tasks: [] };
    default:
      return state;
  }
};
