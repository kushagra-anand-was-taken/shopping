import { PRODUCTS_BY_SEARCH, PRODUCTS_DYNAMIC_SEARCH } from "../action/types";

const initialState = {
  searched_products: [],
  filtered_products: [],
  loading: true,
  search_loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_BY_SEARCH:
      return {
        ...state,
        loading: false,
        filtered_products: payload,
      };

    case PRODUCTS_DYNAMIC_SEARCH:
      return {
        ...state,
        search_loading: false,
        searched_products: payload,
      };

    default:
      return state;
  }
}
