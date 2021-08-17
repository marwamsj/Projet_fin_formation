import {
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGIN_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_LOGOUT_REQUEST,
  PATIENT_LOGOUT_SUCCESS,
  PATIENT_LOGOUT_FAIL,
  ATELIER_LOGIN_REQUEST,
  ATELIER_LOGIN_SUCCESS,
  ATELIER_LOGIN_FAIL,
  ATELIER_REGISTER_REQUEST,
  ATELIER_REGISTER_SUCCESS,
  ATELIER_REGISTER_FAIL,
  ATELIER_LOGOUT_REQUEST,
  ATELIER_LOGOUT_SUCCESS,
  ATELIER_LOGOUT_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  GET_USER,
  GET_USER_FAIL,
} from "../Constants/userConstants";
import axios from "../../helpers/axios";

// Login
export const login = (user) => async (dispatch) => {
  dispatch({ type: PATIENT_LOGIN_REQUEST });
  try {
    let res = await axios.post(`/patient/login`, user);

   if (res.status === 200) {
      
      const { accesstoken, user } = res.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: PATIENT_LOGIN_SUCCESS,
        payload: {
          accesstoken,
          user,
        },
      });
  }
  } catch (err) {
    dispatch({
      type: PATIENT_LOGIN_FAIL,
      payload: err
    });
    alert(err.response && err.response.data.msg
      ? err.response.data.msg
      :err.response.data.errors[0].msg)
  }
};

// Register
export const Register = (user) => async (dispatch) => {
  dispatch({ type: PATIENT_REGISTER_REQUEST });
  try {
    
    let result = await axios.post(`/patient/register`, user);
    if (result.status === 200) {
   //dispatch({ PATIENT_REGISTER_SUCCESS });
      const { accesstoken, user } = result.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: PATIENT_REGISTER_SUCCESS,
        payload: {
          accesstoken,
          user,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: PATIENT_REGISTER_FAIL,
      payload: err
    });
   
    alert(err.response.data && err.response.data.msg
      ? err.response.data.msg
        :err.response.data.errors[0].msg)

  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  
  const accesstoken = localStorage.getItem('accesstoken');
  const user = JSON.parse(localStorage.getItem('user'));
  if(accesstoken && user.role==="patient"){
      
      dispatch({
          type: PATIENT_LOGIN_SUCCESS,
          payload: {
              accesstoken, user
          }
      });
     dispatch(getUser())
  }else{
      dispatch({
          type: PATIENT_LOGIN_FAIL,
          payload: { error: 'Failed to login' },

      });
      
  }
};

export const signout = () =>async (dispatch) => {
  
  dispatch({ type: PATIENT_LOGOUT_REQUEST });
  try {
     await axios.post(`/patient/logout`);
    localStorage.clear();
          dispatch({ type: PATIENT_LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: PATIENT_LOGOUT_FAIL,
      payload: err.response.data
  });
  alert(err.response && err.response.data.msg
    ? err.response.data.msg
    : err.msg)
  }
}

//ATELIER AUTH

// Login
export const loginatl = (user) => async (dispatch) => {
  dispatch({ type: ATELIER_LOGIN_REQUEST });
  try {
    let res = await axios.post(`/atelier/login`, user);

   if (res.status === 200) {
      
      const { accesstoken, user } = res.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: ATELIER_LOGIN_SUCCESS,
        payload: {
          accesstoken,
          user,
        },
      });
  }
  } catch (err) {
    dispatch({
      type: ATELIER_LOGIN_FAIL,
      payload: err
    });
    alert(err.response && err.response.data.msg
      ? err.response.data.msg
      :err.response.data.errors[0].msg)
    
  }
};

// Register
export const Registeratl = (user) => async (dispatch) => {
  dispatch({ type: ATELIER_REGISTER_REQUEST });
  try {
    
    let result = await axios.post(`/atelier/register`, user);
    if (result.status === 200) {
   // dispatch({ ATELIER_REGISTER_SUCCESS });
      const { accesstoken, user } = result.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: ATELIER_REGISTER_SUCCESS,
        payload: {
          accesstoken,
          user,
        },
      });
    } 
  } catch (err) {
    dispatch({
      type: ATELIER_REGISTER_FAIL,
      payload: err
    });
    alert(err.response.data && err.response.data.msg
      ? err.response.data.msg
        :err.response.data.errors[0].msg)
  }
};

export const isAtelierLoggedIn = () => async (dispatch) => {
  const accesstoken = localStorage.getItem('accesstoken');
  const user = JSON.parse(localStorage.getItem('user'));
  if(accesstoken && user.role==="atelier" ){
      
      dispatch({
          type: ATELIER_LOGIN_SUCCESS,
          payload: {
              accesstoken, user
          }
      });
      dispatch(getUser())
  }else{
      dispatch({
          type: ATELIER_LOGIN_FAIL,
          payload: { error: 'Failed to login' }
      });
  }
};

export const signouta = () =>async (dispatch) => {
  
  dispatch({ type: ATELIER_LOGOUT_REQUEST });
  try {
     await axios.post(`/atelier/logout`);
    localStorage.clear();
          dispatch({ type: ATELIER_LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: ATELIER_LOGOUT_FAIL,
      payload: err
  });
  alert(err.response && err.response.data
    ? err.response.data
    : err)
  }
}



// ADMIN AUTH
export const loginadmin = (user) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  try {
    let res = await axios.post(`/admin/login`, user);

   if (res.status === 200) {
      
      const { accesstoken, user } = res.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: {
          accesstoken,
          user,
        },
      });
  }
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: err
    }); 
    alert(err.response && err.response.data.msg
      ? err.response.data.msg
      : err.msg)
   }
};

  
export const isADMINLoggedIn = () => async (dispatch) => {
  const accesstoken = localStorage.getItem('accesstoken');
  const user = JSON.parse(localStorage.getItem('user'));
  if(accesstoken &&user.role==="admin" ){
      
      dispatch({
          type: ADMIN_LOGIN_SUCCESS,
          payload: {
              accesstoken, user
          }
      });
  }else{
      dispatch({
          type: ADMIN_LOGIN_FAIL,
          payload: { error: 'Failed to login' }
      });
  }
};

export const signoutdmin = () =>async (dispatch) => {
  
  dispatch({ type: ADMIN_LOGOUT_REQUEST });
  try {
     await axios.post(`/admin/logout`);
    localStorage.clear();
          dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: ADMIN_LOGOUT_FAIL,
      payload: err
  });
  alert(err.response && err.response.data.msg
    ? err.response.data.msg
    : err.msg)
  }
}
// get user 

export const getUser = () => async (dispatch) => {
  try {
    
    let result = await axios.get(`/user/getprofile`);   
    dispatch({ type: GET_USER , payload:result.data.response}); 
} catch (err) {
    dispatch({type: GET_USER_FAIL, payload:err})
    alert(err.response && err.response.data.msg
      ? err.response.data.msg
      :err.response.data.errors[0].msg)
  }
};

// Profile

export const upprofileuser = (user) => async (dispatch) => {
  try {
    
    await axios.put(`/user/updateprofile`, user);   
    //dispatch(getUser()); 
   // if (user.role==="patient"){
     // const { accesstoken, user } = res.data;
     // localStorage.setItem("accesstoken", accesstoken);
    //  localStorage.setItem("user", JSON.stringify(user));
    //  dispatch({
     //   type: GET_USER ,
       // payload: {
         // accesstoken,
        //  user,
        //},
   //   });
 //   }
 dispatch(getUser())
} catch (err) {
    dispatch({type: GET_USER_FAIL, payload:err})
    alert(err.response && err.response.data.msg
      ? err.response.data.msg
      :err.response.data.errors[0].msg)
  }
};

