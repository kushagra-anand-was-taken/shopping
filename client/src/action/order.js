import { CART_ORDER, LIST_ORDER, LIST_STATUS } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const cartorder = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/order",
      data: data,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    });
    dispatch({
      type: CART_ORDER,
      payload: res.data,
    });
    dispatch(setAlert("Order Placed", "success"));
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const listorder = () => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/order/list",
      headers: {
        "x-auth-token": localStorage.token,
      },
    });
    dispatch({
      type: LIST_ORDER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const liststatus = () => async (dispatch) => {
//   try {
//     const res = axios.get("/api/order/status");
//     dispatch({
//       type: LIST_STATUS,
//       payload: res.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
