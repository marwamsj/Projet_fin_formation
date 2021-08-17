import {
    GET_PRODUCTS_LOAD,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_LOAD,
    GET_PRODUCT,
    TOGGLE_TRUE,
    CREATE_REVIEW_LOAD,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    ADD_COMMENT,
    GET_PRODUCT_BY_CATEGORY,
  } from "../Constants/productConstants";
  import axios from "../../helpers/axios";

  // get all products
  export const getProducts = () => async (dispatch) => {
      dispatch({type: GET_PRODUCTS_LOAD});
    try {
        let result = await axios.get(`/atelier/articles`)
        dispatch ({type: GET_PRODUCTS_SUCCESS, payload:result.data.response})        
    } catch (error) {
        dispatch({type: GET_PRODUCTS_FAIL, payload:error})
        alert(error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg)
    }
  }
  //create product
export const createProduct = (product) => async (dispatch) => {
  try {
      await axios.post(`/atelier/articles/product`,product)
      dispatch (getProducts())  
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}

//get product By Id
export const getProductById = (id) => async (dispatch) => {
  dispatch({type: GET_PRODUCT_LOAD});
  try {
   
    let result = await axios.get(`atelier/article/${id}`)
      dispatch ({type: GET_PRODUCT, payload:result.data.response})    
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}


 //delele product
 export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`atelier/article/${id}`)
      dispatch (getProducts())        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error});
      alert(error.response && error.response.data
        ? error.response.data
        : error);
       
  }
}
 //edit product
 export const toggleTrue=()=>{
  return{
      type:TOGGLE_TRUE
  }
}
 export const editProduct = (id,form) => async (dispatch) => {
  try {
      let res=await axios.put(`atelier/article/${id}`,form)
      dispatch (getProducts())
      alert(res.response.data.msg)        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}

 //like product
 export const likeProduct = (id) => async (dispatch) => {
  try {
      await axios.put(`atelier/article/like/${id}`)
      dispatch (getProducts())        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}

 //unlike product
 export const unlikeProduct = (id) => async (dispatch) => {
  try {
      await axios.put(`atelier/article/unlike/${id}`)
      dispatch (getProducts())        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}

//create review
export const createProductReview = (pay,form) => async (dispatch) => {
  dispatch({type: CREATE_REVIEW_LOAD});
  try {
    const { productId } = pay.params;
     await axios.put(`/atelier/article/rate/${productId}`,form)
      dispatch ({type: CREATE_REVIEW_SUCCESS})
     //dispatch (getProducts())  
    dispatch(getProductById(productId )) 
  } catch (error) {
      dispatch({type: CREATE_REVIEW_FAIL})
      alert(error.response && error.response.data
        ? error.response.data
        : error)
  }
}

//create comment 
export const createComment = (productId,form) => async (dispatch) => {
  
  try {
    let result = await axios.put(`/atelier/article/comment/${productId}`,form)
      dispatch ({type: ADD_COMMENT,payload: result.data})
      dispatch(getProductById(productId ))  
  } catch (error) {
    dispatch({type: GET_PRODUCTS_FAIL, payload:error})
    alert(error.response && error.response.data.msg
      ? error.response.data.msg
      : error.msg)
  }
}
//add like to comment
export const likeProductComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.put(`/atelier/article/like/${productId}/${commentId}`)
     dispatch (getProductById(productId))        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.msg
        ? error.response.data.msg
        : error.msg)
  }
}

// remove like from comment
export const unlikeProductComment = (productId,commentId) => async (dispatch) => {
  try {
      await axios.delete(`/atelier/article/unlike/${productId}/${commentId}`)
      dispatch (getProductById(productId))        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data
        ? error.response.data
        : error)
  }
}
//delete comment 
export const deleteComment = (id,comment_id) => async (dispatch) => {
  try {
      await axios.delete(`atelier/article/uncomment/${id}/${comment_id}`)
      dispatch (getProductById(id))        
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data
        ? error.response.data
        : error)
  }
}
//export const getProductByCategory 
export const getProductByCategory = (categoryId) => async (dispatch) => {
  try {
   
    let result = await axios.get(`atelier/articles/${categoryId}`)
      dispatch ({type: GET_PRODUCT_BY_CATEGORY, payload:result.data.response})  
    //  dispatch (getProducts())  
  } catch (error) {
      dispatch({type: GET_PRODUCTS_FAIL, payload:error})
      alert(error.response && error.response.data.message
        ? error.response.data.message
        : error.message)
  }
}
