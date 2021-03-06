import * as Types from "../Types";
import { HYDRATE } from "next-redux-wrapper";

export const User = (state = {}, action) => {
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
