import {
    GET_NEEDS_LOAD,
    GET_NEEDS_SUCCESS,
    GET_NEEDS_FAIL,
    GET_NEED,
    TOGGLE_TRUE,
  } from "../Constants/patientNeeds";
  
  const InitialState = {
    needs: [],
    loadNeeds: false,
    errors: null,
    edit: false,
    need: {},
  };
  export const patientNeeds = (state = InitialState, { type, payload }) => {
    switch (type) {
      case GET_NEEDS_LOAD:
        return { ...state, loadNeeds: true ,edit: false };
      case GET_NEEDS_SUCCESS:
        return { ...state, needs:payload, loadNeeds: false, edit: false,};
      case GET_NEEDS_FAIL:
        return { ...state, loadNeeds: false, errors: payload, edit: false, };
        case GET_NEED:
        return { ...state, need: payload, loadNeeds: false };
      case TOGGLE_TRUE:
        return { ...state, edit: true };
      default:
        return state;
    }
  };
  