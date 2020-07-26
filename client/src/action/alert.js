import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, type) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: "SET_ALERT",
    payload: { msg, type, id },
  });
  setTimeout(() => {
    dispatch({ type: "REMOVE_ALERT", payload: id });
  }, 2000);
};
