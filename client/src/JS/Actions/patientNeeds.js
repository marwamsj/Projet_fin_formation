import {
    GET_NEEDS_LOAD,
    GET_NEEDS_SUCCESS,
    GET_NEEDS_FAIL,
    GET_NEED,
    TOGGLE_TRUE,
    ADD_COMMENT,
  } from "../Constants/patientNeeds";
  import axios from "../../helpers/axios";

  // get all patient needs
  export const getNeeds = () => async (dispatch) => {
      dispatch({type: GET_NEEDS_LOAD});
    try {
        let result = await axios.get(`/patient/besoin`)
        dispatch ({type: GET_NEEDS_SUCCESS, payload:result.data.response})        
    } catch (error) {
        dispatch({type: GET_NEEDS_FAIL, payload:error})
      // alert(error.response.msg)
    }
  }
    //create need
export const createNeed = (form) => async (dispatch) => {
  try {
      let res=await axios.post(`patient/besoin/product`,form)
      dispatch (getNeeds()) 
      alert(res.data.msg)
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

 //delele need
 export const deleteNeed = (id) => async (dispatch) => {
  try {
    await axios.delete(`/patient/besoin/${id}`)
      dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

//like need
export const likeNeed = (id) => async (dispatch) => {
  try {
      await axios.put(`/patient/besoin/like/${id}`)
      dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

 //unlike need  
 export const unlikeNeed = (id) => async (dispatch) => {
  try {
      await axios.put(`/patient/besoin/unlike/${id}`)
      dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
     alert(error.response.data.msg)
  }
}

//create comment need
export const createCommentNeed = (needId,form) => async (dispatch) => {
  
  try {
    let result = await axios.put(`/patient/besoin/comment/${needId}`,form)
      dispatch ({type: ADD_COMMENT,payload: result.data})
      dispatch(getNeeds())  
  } catch (error) {
    dispatch({type: GET_NEEDS_FAIL, payload:error})
  }
}

//add like to comment
export const likeNeedComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.put(`/patient/besoin/like/${productId}/${commentId}`)
     dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

// remove like from comment
export const unlikeNeedComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.delete(`/patient/besoin/unlike/${productId}/${commentId}`)
      dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}
//delete comment 
export const deleteCommentNeed = (id,comment_id) => async (dispatch) => {
  try {
      await axios.delete(`/patient/besoin/uncomment/${id}/${comment_id}`)
      dispatch (getNeeds())        
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
      alert(error.response && error.response.data
        ? error.response.data
        : error)
  }
}

//get need By Id
export const getNeedById = (id) => async (dispatch) => {
 
  try {
   
    let result = await axios.get(`/patient/besoin/${id}`)
      dispatch ({type: GET_NEED, payload:result.data.response})  
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
    
  }
}

 //edit need
 export const toggleTrue=()=>{
  return{
      type:TOGGLE_TRUE
  }
}
 export const editNeed = (id,form) => async (dispatch) => {
  try {
    let result =await axios.put(`/patient/besoin/${id}`,form)
      dispatch (getNeeds())  
      alert(result.response.msg)      
  } catch (error) {
      dispatch({type: GET_NEEDS_FAIL, payload:error})
     // alert(error.response.data.msg)
  }
}