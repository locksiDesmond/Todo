export const saveStateToLocalStorage = (state) => {
  const stringify = JSON.stringify(state);
  try {
    localStorage.setItem("state", stringify);
  } catch {
    // console.log("error getting localstorage");
  }
};
export const loadDataFromLocalStorage = () => {
  let user;
  try {
    user = localStorage.getItem("state");
  } catch (e) {
    // console.log(e);
    return undefined;
  }
  if (user === null) return undefined;
  const json = JSON.parse(user);
  return json;
};
