import {
    GET_CATEGORY_LOAD,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    EDIT_TRUE,
    GET_CATEGORY,
  } from "../Constants/categoryConstants";
  import axios from "../../helpers/axios";

  // get all categories
  export const getAllCategory = () => async (dispatch) => {
      dispatch({type: GET_CATEGORY_LOAD});
    try {
        let result = await axios.get(`/atelier/category`)
        dispatch ({type: GET_CATEGORY_SUCCESS, payload:result.data})        
    } catch (error) {
        dispatch({type: GET_CATEGORY_FAIL, payload:error})
        
    }
  }
  //delele category
  export const deleteCategory = (id) => async (dispatch) => {
  try {
      await axios.delete(`atelier/category/${id}`)
      dispatch (getAllCategory())        
  } catch (error) {
      dispatch({type: GET_CATEGORY_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}
//create category
export const createCategory = (form) => async (dispatch) => {
  try {
      await axios.post(`atelier/category`,form)
      dispatch (getAllCategory())        
  } catch (error) {
      dispatch({type: GET_CATEGORY_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

//get Category By Id
export const getCategoryById = (id) => async (dispatch) => {
  try {

    let result = await axios.get(`atelier/category/${id}`)
      dispatch ({type: GET_CATEGORY, payload:result.data.response})        
  } catch (error) {
      dispatch({type: GET_CATEGORY_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

  //edit category
  export const editTrue=()=>{
    return{
        type:EDIT_TRUE
    }
  }
  export const editCategory = (id,form) => async (dispatch) => {
    try {

        await axios.put(`atelier/category/${id}`,form)
        dispatch (getAllCategory())        
    } catch (error) {
        dispatch({type: GET_CATEGORY_FAIL, payload:error})
        alert(error.response.data.msg)
    }
  }