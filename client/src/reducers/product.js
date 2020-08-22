import {
  ADD_PRODUCTS,
  PRODUCTS_BY_CATEGORY,
  SINGLE_PRODUCT,
  RELATED_PRODUCT,
} from "../action/types";

const initialState = {
  products: [],
  related_products: [],
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

    case SINGLE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };

    case RELATED_PRODUCT:
      return {
        ...state,
        related_products: payload,
        loading: false,
      };
    default:
      return state;
  }
}
