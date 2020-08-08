import * as Types from "../Types";
import { HYDRATE } from "next-redux-wrapper";
import isArrayEmpty from "./../../lib/isArrayEmpty";
export const List = (state = { lists: [] }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_LIST_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_LIST_REQUESTED:
    case Types.DELETE_LIST_REQUESTED:
    case Types.UPDATE_LIST_REQUESTED:
      return {
        ...state,
        fetching: isArrayEmpty(state.lists) ? true : false,
        loading: true,
      };
    case Types.UPDATE_LIST_SUCCEEDED:
      const listWithUpdate = state.lists.map((item, index) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        lists: [...listWithUpdate],
        loading: false,
        fetching: false,
        error: "",
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
