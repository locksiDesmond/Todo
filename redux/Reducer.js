import { HYDRATE } from "next-redux-wrapper";
import * as Types from "./Types";
import isArrayEmpty from "./../lib/isArrayEmpty";
import { openModal } from "./Action";

export const user = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_USER_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_USER_REQUESTED:
      return { ...state, loading: true };
    case Types.ADD_USER_SUCCEEDED:
      return { ...state, ...action.payload, loading: false, error: "" };
    case Types.REMOVE_USER:
      return {};
    default:
      return state;
  }
};
export const list = (state = { lists: [] }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_LIST_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_LIST_REQUESTED:
    case Types.DELETE_LIST_REQUESTED:
      return {
        ...state,
        fetching: isArrayEmpty(state.lists) ? true : false,
        loading: true,
      };
    case Types.ADD_LIST_SUCCEEDED:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        loading: false,
        fetching: false,
        error: "",
      };
    case Types.CLEAR_LIST:
      return { ...state, lists: [], loading: false, error: null };
    case Types.DELETE_LIST_SUCCEEDED:
      const filteredList = state.lists.filter((item) => {
        if (item._id !== action.payload) {
          return true;
        }
      });
      return { ...state, lists: [...filteredList] };
    case Types.REMOVE_USER:
      return { list: [] };
    default:
      return state;
  }
};
export const tasks = (state = { tasks: [] }, action) => {
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
        fetching: isArrayEmpty(state.tasks) ? true : false,
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
      return { ...state, tasks: [], loading: false, error: null };
    case Types.REMOVE_USER:
      return { tasks: [] };
    default:
      return state;
  }
};
export const modal = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.OPEN_MODAL:
      if (action.payload) {
        return { ...state, defaultValues: { ...action.payload }, isOpen: true };
      }
      return { ...state, isOpen: !state.isOpen };
    case Types.CLOSE_MODAL:
      return { isOpen: false };
    default:
      return state;
  }
};
