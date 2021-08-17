import {
  GET_CARTS_LOAD,
  GET_CARTS_SUCCESS,
  GET_CARTS_FAIL,
  GET_CART,
  TOGGLECAT_TRUE,
} from "../Constants/atelierCartConstants";

const InitialState = {
  contacts: [],
  loadCarts: false,
  errors: null,
  edit: false,
  cardRed: {},
};
export const atelierCart = (state = InitialState, { type, payload }) => {
  switch (type) {
    case GET_CARTS_LOAD:
      return { ...state, loadCarts: true ,edit: false, };
    case GET_CARTS_SUCCESS:
      return { ...state, contacts: payload, loadCarts: false, edit: false,};
    case GET_CARTS_FAIL:
      return { ...state, loadCarts: false, errors: payload, edit: false, };
      case GET_CART:
        return { ...state, cardRed: payload, loadCarts: false };
      case TOGGLECAT_TRUE:
        return { ...state, edit: true };
    default:
      return state;
  }
};
