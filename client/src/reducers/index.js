import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import category from "./category";
import product from "./product";
import filtered_product from "./filtered_products";
import orders from "./orders";

export default combineReducers({
  auth,
  alert,
  category,
  product,
  filtered_product,
  orders,
});
