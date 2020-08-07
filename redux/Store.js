import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { user, list, tasks } from "./Reducer";
import { loadDataFromLocalStorage } from "../lib/LocalStorage";
import { saveStateToLocalStorage } from "./../lib/LocalStorage";

const reducer = combineReducers({
  user,
  list,
  tasks,
});
const persistedState = loadDataFromLocalStorage();
const middleware = [thunk];
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);
store.subscribe(() => saveStateToLocalStorage(store.getState()));
export default store;
