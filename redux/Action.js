import * as Types from "./Types";
import Cookies from "js-cookie";
export const addUserRequested = () => ({
  type: Types.ADD_USER_REQUESTED,
});
export const addUserSucceeded = (user) => ({
  type: Types.ADD_USER_SUCCEEDED,
  payload: user,
});
export const addUserFailed = (error) => ({
  type: Types.ADD_USER_FAILED,
  payload: error,
});
export const addListRequested = () => ({
  type: Types.ADD_LIST_REQUESTED,
});
export const addListSucceeded = (title) => ({
  type: Types.ADD_LIST_SUCCEEDED,
  payload: title,
});
export const addListFailed = (error) => ({
  type: Types.ADD_LIST_FAILED,
  payload: error,
});
export const toggleTask = (id) => ({
  type: Types.TOOGLE_TASK,
  payload: id,
});
export const deleteTaskRequested = () => ({
  type: Types.DELETE_TASK_REQUESTED,
});
export const deleteTaskFailed = (error) => ({
  type: Types.DELETE_TASK_FAILED,
  payload: error,
});
export const deleteTaskSucceeded = (id) => ({
  type: Types.DELETE_TASK_SUCCEEDED,
  payload: id,
});
export const addTaskRequested = () => ({
  type: Types.ADD_TASK_REQUESTED,
});
export const addTaskSucceeded = (task) => ({
  type: Types.ADD_TASK_SUCCEEDED,
  payload: task,
});
export const addTaskFailed = (error) => ({
  type: Types.ADD_TASK_FAILED,
  payload: error,
});
export const addUser = (data, url) => async (dispatch) => {
  dispatch(addUserRequested());

  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  if (response.details) {
    dispatch(addUserFailed(response));
  } else {
    const { token, user } = response;
    Cookies.set("token", token, { expires: 1024 });

    dispatch(addUserSucceeded(user));
  }
};
export const addList = (data) => async (dispatch) => {
  dispatch(addListRequested());

  const response = await fetch(`/api/createlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  if (response.details) {
    dispatch(addListFailed(response));
  } else {
    dispatch(addListSucceeded(response));
  }
};
export const deletePost = (id) => async (dispatch) => {
  dispatch(deleteTaskRequested());
  const response = await fetch(`/api/lists?id=${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const addTask = (data) => async (dispatch) => {
  dispatch(addTaskRequested());
  dispatch(addTaskSucceeded(data));
  return { success: true };
  // const response = await fetch(`/api/task`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then((res) => res.json());

  // if (response.details) {
  //   dispatch(addTaskFailed(response));
  // } else {
  //   dispatch(addTaskSucceeded(response));
  // }
};
