import {
    GET_CARTS_LOAD,
    GET_CARTS_SUCCESS,
    GET_CARTS_FAIL,
    ADD_COMMENT_CART,
    GET_CART,
    TOGGLECAT_TRUE,
  } from "../Constants/atelierCartConstants";
  import axios from "../../helpers/axios";

  // get all cartes
  export const getAllCarts = () => async (dispatch) => {
      dispatch({type: GET_CARTS_LOAD});
    try {
        let result = await axios.get(`/atelier/cart`)
        dispatch ({type: GET_CARTS_SUCCESS, payload:result.data.response})        
    } catch (error) {
        dispatch({type: GET_CARTS_FAIL, payload:error})
        
    }
  }
   //create carte
export const createCart = (cart) => async (dispatch) => {
  try {
      let res=await axios.post(`/atelier/profile`,cart)
      dispatch (getAllCarts()) 
      alert(res.data.msg)
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

 //delele carte
 export const deleteCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`/atelier/cart/${id}`)
      dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

//like carte
export const likeCart = (id) => async (dispatch) => {
  try {
      await axios.put(`/atelier/cart/like/${id}`)
      dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

 //unlike carte  
 export const unlikeCart = (id) => async (dispatch) => {
  try {
      await axios.put(`/atelier/cart/unlike/${id}`)
      dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
     alert(error.response.data.msg)
  }
}

//create comment card
export const createCommentCart = (productId,form) => async (dispatch) => {
  
  try {
    let result = await axios.put(`/atelier/cart/comment/${productId}`,form)
      dispatch ({type: ADD_COMMENT_CART,payload: result.data})
      dispatch(getAllCarts())  
  } catch (error) {
    dispatch({type: GET_CARTS_FAIL, payload:error});
  }
  
}

//add like to comment
export const likeCartComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.put(`/atelier/cart/like/${productId}/${commentId}`)
     dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}

// remove like from comment
export const unlikeCartComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.delete(`/atelier/cart/unlike/${productId}/${commentId}`)
      dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response.data.msg)
  }
}
//delete comment 
export const deleteCommentCart = (id,comment_id) => async (dispatch) => {
  try {
      await axios.delete(`/atelier/cart/uncomment/${id}/${comment_id}`)
      dispatch (getAllCarts())        
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
      alert(error.response && error.response.data
        ? error.response.data
        : error)}
}

//get carte By Id
export const getCartById = (id) => async (dispatch) => {
 
  try {
   
    let result = await axios.get(`atelier/cart/${id}`)
      dispatch ({type: GET_CART, payload:result.data.response})  
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
    
  }
}

 //edit cart
 export const toggleTrue=()=>{
  return{
      type:TOGGLECAT_TRUE
  }
}
 export const editCart = (id,form) => async (dispatch) => {
  try {
    let result =await axios.put(`/atelier/profile/${id}`,form)
      dispatch (getAllCarts())  
      alert(result.response.msg)      
  } catch (error) {
      dispatch({type: GET_CARTS_FAIL, payload:error})
     // alert(error.response.data.msg)
  }
}
