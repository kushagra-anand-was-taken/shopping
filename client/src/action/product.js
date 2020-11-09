import {
  ADD_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  PRODUCTS_BY_SEARCH,
  PRODUCTS_DYNAMIC_SEARCH,
  SINGLE_PRODUCT,
  RELATED_PRODUCT,
} from "./types";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import queryString from "query-string";
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

export const dynamicproduct = (params) => async (dispatch) => {
  const query = queryString.stringify(params);
  try {
    const res = await axios.get(`/api/products/search?${query}`);
    dispatch({
      type: PRODUCTS_DYNAMIC_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    // const errors = error.response.data.error;
    // dispatch(setAlert(errors, "danger"));
  }
};

export const single_product = (id) => async (dispatch) => {
  setAuthToken(localStorage.token);
  try {
    const res = await api.get(`/product/${id}`);
    dispatch({
      type: SINGLE_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.error;
    dispatch(setAlert(errors, "danger"));
  }
};

export const related_product = (id) => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/products/related",
      headers: {
        productid: id,
      },
    });
    dispatch({
      type: RELATED_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response?.data.error;
    dispatch(setAlert(errors, "danger"));
  }
};
