import React from "react";
import Layout from "../layout/layout";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const User_Home = () => {
  const auth = useSelector((state) => state.auth);

  const { user, loading } = auth;

  if (user && user.role === 1) {
    return <Redirect to="/admin" />;
  }

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{user && user.name}</li>
          <li className="list-group-item">{user && user.email}</li>
          <li className="list-group-item">
            {user && user.role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">product</li>
        </ul>
      </div>
    );
  };

  return loading ? (
    <h1>wait</h1>
  ) : (
    <Layout
      title="Dashboard"
      description={`G'day ${user && user.name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default User_Home;
