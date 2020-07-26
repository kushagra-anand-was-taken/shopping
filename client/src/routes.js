import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import User_Home from "./component/sign/user_home";
import Admin_Home from "./component/sign/admin_home";
import Signin from "./component/sign/signin";
import Signup from "./component/sign/signup";
import Home from "./component/sign/home";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const route = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/user" component={User_Home} />
        <AdminRoute exact path="/admin" component={Admin_Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default route;
