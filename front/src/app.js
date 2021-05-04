import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import Homepage from "./components/Homepage";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./components/SignUpForm";

render(
    <BrowserRouter>
        <Switch>
            <PublicRoute exact path="/login" component={LoginForm} />
            <PublicRoute exact path="/signup" component={SignUpForm} />
            <PrivateRoute exact path="/" component={Homepage} />
        </Switch>

    </BrowserRouter>,
    document.querySelector('#content')
);
