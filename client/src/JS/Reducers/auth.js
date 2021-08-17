import {
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGOUT_REQUEST,
  PATIENT_LOGOUT_SUCCESS,
  PATIENT_LOGOUT_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAIL,
  ATELIER_LOGIN_REQUEST,
  ATELIER_LOGIN_SUCCESS,
  ATELIER_LOGOUT_REQUEST,
  ATELIER_LOGOUT_SUCCESS,
  ATELIER_LOGOUT_FAIL,
  ATELIER_REGISTER_REQUEST,
  ATELIER_REGISTER_SUCCESS,
  ATELIER_REGISTER_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  GET_USER,
  GET_USER_FAIL,
} from "../Constants/userConstants";

const initState = {
  accesstoken: null,
  user: {},
  authenticate: false,
  //authenticating: false,
  loading: false,
  error: null,
  authenticateatl: false,
  authenticateadmin: false,
};

export const auth = (state = initState, { type, payload }) => {
  switch (type) {
    case PATIENT_LOGIN_REQUEST:
      return {
        ...state,
      };
    case PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        accesstoken: payload.accesstoken,
        user: payload.user,
        authenticate: true,
        //authenticating: false,
        authenticateatl: false,
        authenticateadmin: false,
      };

    case PATIENT_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PATIENT_LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case PATIENT_LOGOUT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case PATIENT_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PATIENT_REGISTER_SUCCESS:
      return {
        ...state,
        accesstoken: payload.accesstoken,
        user: payload.user,
        authenticate: true,
        loading: false,
        authenticateatl: false,
        authenticateadmin: false,
        edit: false,
      };

    case PATIENT_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ATELIER_LOGIN_REQUEST:
      return {
        ...state,
      };
    case ATELIER_LOGIN_SUCCESS:
      return {
        ...state,
        accesstoken: payload.accesstoken,
        user: payload.user,
        authenticateatl: true,
        //authenticating: false,
        authenticate: false,
        authenticateadmin: false,
      };
    case ATELIER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ATELIER_LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case ATELIER_LOGOUT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ATELIER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ATELIER_REGISTER_SUCCESS:
      return {
        ...state,
        accesstoken: payload.accesstoken,
        user: payload.user,
        authenticateatl: true,
        loading: false,
        authenticate: false,
        authenticateadmin: false,
      };

    case ATELIER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        accesstoken: payload.accesstoken,
        user: payload.user,
        authenticateadmin: true,
        //authenticating: false,
        authenticateatl: false,
        authenticate: false,
      };
    case ADMIN_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case ADMIN_LOGOUT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
      case GET_USER:
      return {
        ...state,
        user: payload,
      };
      case GET_USER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case PROFILE_UPDATE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
