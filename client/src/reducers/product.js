import { ADD_PRODUCTS, PRODUCTS_BY_CATEGORY } from "../action/types";

const initialState = {
  products: [],
  product: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        product: payload,
        // categories: [payload, ...state.categories],
        loading: false,
      };

    case PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: payload,
      };

    default:
      return state;
  }
}
