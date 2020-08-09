import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { loadDataFromLocalStorage } from "../lib/LocalStorage";
import { saveStateToLocalStorage } from "./../lib/LocalStorage";
import { User } from "./Reducers/User";
import { List } from "./Reducers/Lists";
import { Tasks } from "./Reducers/Tasks";
import { Modal } from "./Reducers/Modal";

const reducer = combineReducers({
  user: User,
  list: List,
  tasks: Tasks,
  modal: Modal,
});
const persistedState = loadDataFromLocalStorage(); // load store from local storage
const middleware = [thunk];
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.subscribe(() => saveStateToLocalStorage(store.getState())); // save store to local storage
export default store;
