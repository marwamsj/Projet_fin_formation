import {
    UPLOAD_PHOTO,
    UPLOAD_PHOTO_SUCCESS,
    UPLOAD_PHOTO_FAIL,
    DESTROY_PHOTO_SUCCESS,
    DESTROY_PHOTO_FAIL,
  } from "../Constants/uploadConstant";

  const InitialState = {
    
    loading: false,
    errors: null,
    image:{}
  };
  export const upload = (state = InitialState, { type, payload }) => {
    switch (type) {
      case UPLOAD_PHOTO:
        return { ...state, loading: true };
      case UPLOAD_PHOTO_SUCCESS:
        return { ...state, image: payload, loading: false };
      case UPLOAD_PHOTO_FAIL:
        return { ...state, loading: false, errors: payload };
      case DESTROY_PHOTO_SUCCESS: return {...state}
      case DESTROY_PHOTO_FAIL: return {...state,errors: payload}
  
      default:
        return state;
    }
  };