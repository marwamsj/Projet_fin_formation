import axios from "axios";
import { api } from "./urlConfig";
import { store } from "../JS/Store/Store";
import {
  ADMIN_LOGOUT_SUCCESS,
  ATELIER_LOGOUT_SUCCESS,
  PATIENT_LOGOUT_SUCCESS,
} from "../JS/Constants/userConstants";


const accesstoken = window.localStorage.getItem("accesstoken");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
  },
});
axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.accesstoken) {
    req.headers.Authorization = `Bearer ${auth.accesstoken}`;
  }
  return req
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: ADMIN_LOGOUT_SUCCESS });
      store.dispatch({ type: ATELIER_LOGOUT_SUCCESS });
      store.dispatch({ type: PATIENT_LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
