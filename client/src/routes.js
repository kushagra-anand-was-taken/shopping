import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./component/sign/home";
import Signin from "./component/sign/signin";
import Signup from "./component/sign/signup";

const route = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default route;
