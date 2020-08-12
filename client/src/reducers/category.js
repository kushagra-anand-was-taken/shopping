import { ADD_CATEGORY, GET_CATEGORY } from "../action/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category: payload,
        // categories: [payload, ...state.categories],
        loading: false,
      };
    case GET_CATEGORY:
      return { ...state, categories: payload, loading: false };
    default:
      return state;
  }
}
