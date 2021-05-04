import React from 'react';
import AuthService from '../services/auth.service';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                !AuthService.isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PublicRoute;
