import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const accesstoken = window.localStorage.getItem('accesstoken');
        if(accesstoken){
            return <Component {...props} />
        }else{
            return <Redirect to={`/`} />
        }
    }} />
}

export default PrivateRoute;