import { combineReducers } from "redux";
import { auth } from "./auth";
import { atelierCart } from "./atelierCart";
import { category } from "./category";
import { product } from "./product";
import { upload } from "./upload";
import { patientNeeds } from "./patientNeeds";


export const rootReducer = combineReducers({
  auth,
  atelierCart,
  category,
  product,
  upload,
  patientNeeds,
 
});
