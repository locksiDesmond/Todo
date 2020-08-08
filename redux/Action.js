import * as Types from "./Types";
import Cookies from "js-cookie";
// user action creators

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
export const removeUser = () => ({
  type: Types.REMOVE_USER,
});

// lists action creators

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
export const deleteListRequested = () => ({
  type: Types.DELETE_LIST_REQUESTED,
});
export const deleteListSucceeded = (title) => ({
  type: Types.DELETE_LIST_SUCCEEDED,
  payload: title,
});
export const updateListRequested = () => ({
  type: Types.UPDATE_LIST_REQUESTED,
});
export const updateListFailed = (error) => ({
  type: Types.UPDATE_LIST_FAILED,
  payload: data,
});
export const updateListSucceeded = (data) => ({
  type: Types.UPDATE_LIST_SUCCEEDED,
  payload: data,
});
export const clearList = () => ({
  type: Types.CLEAR_LIST,
});

// tasks action creator

export const clearTask = (id) => ({
  type: Types.CLEAR_TASK,
  payload: id,
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
export const updateTaskRequested = () => ({
  type: Types.UPDATE_TASK_REQUESTED,
});
export const updateTaskFailed = (error) => ({
  type: Types.UPDATE_TASK_FAILED,
  payload: data,
});
export const updateTaskSucceeded = (data) => ({
  type: Types.UPDATE_TASK_SUCCEEDED,
  payload: data,
});

// modal action creators
export const openModal = (data = null, options) => ({
  type: Types.OPEN_MODAL,
  payload: { data, options },
});
export const closeModal = () => ({
  type: Types.CLOSE_MODAL,
});

// redux async action creator
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

  const response = await fetch(`/api/list`, {
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
    return { success: true };
  }
};

export const addTask = (data) => async (dispatch) => {
  dispatch(addTaskRequested());
  const response = await fetch(`/api/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  if (response.details) {
    dispatch(addTaskFailed(response));
  } else {
    dispatch(addTaskSucceeded(response));
    return { success: true };
  }
};

export const getList = () => async (dispatch) => {
  dispatch(addListRequested());
  const response = await fetch("/api/list").then((res) => res.json());
  if (response) {
    dispatch(clearList());
    response.forEach((element) => {
      dispatch(addListSucceeded(element));
    });
  }
};
export const getTask = (id) => async (dispatch) => {
  dispatch(addTaskRequested());
  const response = await fetch(`/api/task?list=${id}`).then((res) =>
    res.json()
  );
  if (response) {
    dispatch(clearTask(id));
    response.map((element) => {
      dispatch(addTaskSucceeded(element));
    });
  }
};
export const deleteList = (id) => async (dispatch) => {
  dispatch(deleteListRequested());
  const response = await fetch(`/api/list?id=${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
  if (response.message === "List successfully deleted") {
    dispatch(deleteListSucceeded(id));
  }
};
export const deleteTask = (id) => async (dispatch) => {
  dispatch(deleteTaskRequested());
  const response = await fetch(`/api/task?id=${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
  if (response.message === "List successfully deleted") {
    dispatch(deleteTaskSucceeded(id));
    return { message: "done" };
  }
};
export const updateTask = (data, id) => async (dispatch) => {
  dispatch(updateTaskRequested());
  const response = await fetch(`/api/task?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (response.task) {
    dispatch(updateTaskSucceeded(response.task));
    return { message: "done" };
  }
};
export const updateList = (data, id) => async (dispatch) => {
  dispatch(updateListRequested());
  const response = await fetch(`/api/list?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (response.list) {
    dispatch(updateListSucceeded(response.list));
    return { message: "done" };
  }
};
