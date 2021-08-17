import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Login from "./Components/patient/Login";
import Regester from "./Components/patient/Regester";
import LoginAtelier from "./Components/atelier/LoginAtelier";
import RegesterAtelier from "./Components/atelier/RegesterAtelier";
import LoginAdmin from "./Components/admin/LoginAdmin";
import PrivateRoute  from './helpers/PrivateRoute'
import "./App.css";
import { isUserLoggedIn , isAtelierLoggedIn, isADMINLoggedIn} from "./JS/Actions/auth";
import CartList from "./Components/Carts/CartList";
import Category from "./Components/product/Category";
import Products from "./Components/product/Products";
import AddProduct from "./Components/product/AddProduct";
import ReadMore from "./Components/product/ReadMore";
import { Redirect } from 'react-router-dom';
import CreateCart from "./Components/Carts/CreatCart";
import Forum from "./Components/Forum/Forum";
import Profileuser from "./Components/Profileuser/Profileuser";



function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())}
      return <Redirect to={`/`} />
    
  }, [auth.authenticate]);

  useEffect(() => {
    if (!auth.authenticateatl) {
      dispatch(isAtelierLoggedIn())}
      return <Redirect to={`/`} />
    
  }, [auth.authenticateatl]);
  useEffect(() => {
    if(!auth.authenticateadmin)
    {dispatch(isADMINLoggedIn())}
    return <Redirect to={`/`} /> 
  }, [auth.authenticateadmin])
  return (
    <div className="App">
      <Header />
      <br />
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/patient/register" component={Regester} />
        <Route exact path="/atelier/register" component={RegesterAtelier} />
        <Route path="/patient/login" component={Login} />
        
        <Route path="/atelier/login" component={LoginAtelier} />
        
        <Route path="/admin/login" component={LoginAdmin} />
        <PrivateRoute path="/category" component={Category}/>
        <PrivateRoute exact path="/product" component={Products}/>
        <PrivateRoute path={["/product/addProduct","/product/edit/:id"]} component={AddProduct}/>
        <Route path="/product/:productId" component={ReadMore}/>
        <Route path="/workshop-cartes" component={CartList} />
        <Route path={["/carte","/carte/edit/:id"]} component={CreateCart} />
        <Route exact path="/patient-needs" component={Forum}/>
        <Route exact path="/profileuser" component={Profileuser}/>
      </Switch>
    </div>
  );
}

export default App;
