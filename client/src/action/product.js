import {
  ADD_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  PRODUCTS_BY_SEARCH,
  PRODUCTS_DYNAMIC_SEARCH,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const addproduct = (formdata) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/product/create",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": localStorage.token,
      },
    });
    dispatch({
      type: ADD_PRODUCTS,
      payload: res.data,
    });
    dispatch(setAlert("Product Added", "success"));
  } catch (error) {
    const errors = error.response.data.error;
    dispatch(setAlert(errors, "danger"));
  }
};

export const Productbysell = (CATEGORY) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/products?sortBy=${CATEGORY}&order=desc&limit=5`
    );
    dispatch({
      type: PRODUCTS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.error;
    dispatch(setAlert(errors, "danger"));
  }
};

export const filtered_product = (skip, limit, filters = {}) => async (
  dispatch
) => {
  const data = {
    skip,
    limit,
    filters,
  };

  try {
    const res = await axios({
      method: "post",
      url: "/api/products/by/search",
      data: data,
    });
    dispatch({
      type: PRODUCTS_BY_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dynamicproduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products?sortBy=&order=desc&limit=5`);
    dispatch({
      type: PRODUCTS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.error;
    dispatch(setAlert(errors, "danger"));
  }
};
