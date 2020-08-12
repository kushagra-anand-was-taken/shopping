import { ADD_CATEGORY, GET_CATEGORY } from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const addcategory = (name) => async (dispatch) => {
  try {
    const res = await api.post("/category/create", name);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert("Category Added", "success"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const addcategories = () => async (dispatch) => {
  try {
    const res = await api.get("/category");
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
