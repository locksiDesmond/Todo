import * as Types from "../Types";
import { HYDRATE } from "next-redux-wrapper";
export const Modal = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.OPEN_MODAL:
      if (action.payload)
        if (action.payload) {
          if (action.payload.options) {
            return {
              ...state,
              defaultValues: { ...action.payload.data },
              options: { ...action.payload.options },
              isOpen: true,
            };
          }

          return {
            ...state,
            defaultValues: { ...action.payload },
            isOpen: true,
          };
        }
      return { ...state, isOpen: !state.isOpen };
    // case Types.OPEN_MODAL_WITH_OPTIONS:
    case Types.CLOSE_MODAL:
      return { isOpen: false };
    default:
      return state;
  }
};
