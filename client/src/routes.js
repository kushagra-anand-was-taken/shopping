import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import User_Home from "./component/sign/user_home";
import Admin_Home from "./component/sign/admin_home";
import Signin from "./component/sign/signin";
import Signup from "./component/sign/signup";
import Home from "./component/sign/home";
import Shop from "./component/miscellaneous/Shop";
import Cart from "./component/miscellaneous/Cart";
import Singleproduct from "./component/miscellaneous/singleproduct";
import ManageProducts from "./component/miscellaneous/ManageProducts";
import Adminorder from "./component/miscellaneous/adminorder";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AddCategory from "./component/admin/AddCategory";
import AddProduct from "./component/admin/AddProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
const route = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/user" component={User_Home} />
        <AdminRoute exact path="/admin" component={Admin_Home} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
        <AdminRoute
          exact
          path="/admin/product/update/:id"
          component={UpdateProduct}
        />
        <AdminRoute exact path="/admin/orders" component={Adminorder} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productid" component={Singleproduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default route;
