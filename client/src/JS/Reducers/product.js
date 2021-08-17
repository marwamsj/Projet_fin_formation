import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_LOAD,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_LOAD,
  GET_PRODUCT,
  TOGGLE_TRUE,
  GET_PRODUCT_BY_CATEGORY,
} from "../Constants/productConstants";

const InitialState = {
  products: [],
  loading: false,
  loadingproduct: false,
  errors: null,
  edit: false,
  product: {},
  productsid:[]
};
export const product = (state = InitialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_LOAD:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: payload, loading: false };
    case GET_PRODUCTS_FAIL:
      return { ...state, loading: false, errors: payload };
    case GET_PRODUCT_LOAD:
      return { ...state, loadingproduct: true };
    case GET_PRODUCT:
      return { ...state, product: payload, loadingproduct: false };
    case TOGGLE_TRUE:
      return { ...state, edit: true };
    case GET_PRODUCT_BY_CATEGORY:
      return { ...state, products: payload,loading: false };
    default:
      return state;
  }
};
