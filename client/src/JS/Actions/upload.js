import {
    UPLOAD_PHOTO,
    UPLOAD_PHOTO_SUCCESS,
    UPLOAD_PHOTO_FAIL,
  } from "../Constants/uploadConstant";
  import axios from "../../helpers/axios";

export const photoUpload = (formData) => async (dispatch) => {
    dispatch({type:UPLOAD_PHOTO})
    try {
        let res=await axios.post(`/atelier/upload`, formData);
        dispatch ({type:UPLOAD_PHOTO_SUCCESS,payload:res.data})  
        alert(res.data.message)  
    } catch (error) {
        dispatch({type: UPLOAD_PHOTO_FAIL, payload:error})
        alert(error.response.data.msg)
    }
  }