import { PRODUCTS_BY_SEARCH, PRODUCTS_DYNAMIC_SEARCH } from "../action/types";

const initialState = {
  filterd_products: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_BY_SEARCH:
      return {
        ...state,
        loading: false,
        filterd_products: payload,
      };

    case PRODUCTS_DYNAMIC_SEARCH:
      return {
        ...state,
        loading: false,
        filterd_products: payload,
      };

    default:
      return state;
  }
}
