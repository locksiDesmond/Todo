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
export const addUser = (data, to) => async (dispatch) => {
  dispatch(addUserRequested());

  const response = await fetch(`/api/${to}`, {
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
