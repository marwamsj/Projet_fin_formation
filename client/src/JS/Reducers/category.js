import {
  GET_CATEGORY_LOAD,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  EDIT_TRUE,
  GET_CATEGORY,
} from "../Constants/categoryConstants";

const InitialState = {
  categories: [],
  loading: false,
  error: null,
  edit: false,
  getOne:{}
};
export const category = (state = InitialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORY_LOAD:
      return { ...state, loading: true };
    case GET_CATEGORY_SUCCESS:
      return { ...state, categories: payload, loading: false };
    case GET_CATEGORY_FAIL:
      return { ...state, loading: false, error: payload };
      case GET_CATEGORY:
      return { ...state, getOne: payload };
    case EDIT_TRUE:
      return { ...state, edit: true };
      
    default:
      return state;
  }
};
