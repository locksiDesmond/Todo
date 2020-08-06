import { HYDRATE } from "next-redux-wrapper";
import * as Types from "./Types";

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
    default:
      return state;
  }
};
const initialList = [
  {
    title: "All",
    no_of_task: "4",
    created_by: "skfjiwqrw232wdskf1",
    _id: 1,
  },
  { title: "boss", _id: 2, no_of_task: "5", created_by: "skfjiwqrw232wdskf1" },
  { title: "boss", _id: 3, no_of_task: "4", created_by: "skfjiwqrw232wdskf1" },
];
const initialTasks = [
  {
    title: "boss",
    date: "3d",
    checked: true,
    id: "3",
    list: 1,
    description: "dsf s dskdsf asuyi skiuwl ouw",
    _id: "3",
  },
  {
    id: "1",
    _id: "12",
    description: "dsf s dskdsf asuyi skiuwl ouw",
    title: "kill them",
    date: "1d",
    checked: false,
  },
  {
    description: "buy machete and slaughter em all",
    id: "1",
    _id: "3",
    title: "kill us",
    date: "1d",
    checked: false,
  },
  { id: "1", _id: "1", title: "kil You", date: "1d", checked: false },
];
export const list = (state = { lists: initialList }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_LIST_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_LIST_REQUESTED:
      return { ...state, loading: true };
    case Types.ADD_LIST_SUCCEEDED:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};
export const tasks = (state = { tasks: initialTasks }, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case Types.ADD_TASK_FAILED:
      const message = action.payload.details[0].message;
      return { ...state, error: message, loading: false };
    case Types.ADD_TASK_REQUESTED:
      return { ...state, loading: true };
    case Types.ADD_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
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
    default:
      return state;
  }
};
