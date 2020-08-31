import { CART_ORDER, LIST_ORDER, LIST_STATUS } from "../action/types";

const initialState = {
  order: [],
  orders: [],
  status: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ORDER:
      return {
        ...state,

        order: payload,
      };

    case LIST_ORDER:
      return {
        ...state,

        orders: payload,
        loading: false,
      };
    // case LIST_STATUS:
    //   return {
    //     ...state,

    //     status: payload,
    //   };

    default:
      return state;
  }
}
