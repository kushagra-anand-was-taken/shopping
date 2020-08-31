import React, { useState } from "react";
import Layout from "../layout/layout";
import { Redirect } from "react-router-dom";
import { register } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const initialState = { name: "", email: "", password: "", role: 0 };
  const [values, setValues] = useState(initialState);
  const { name, email, password } = values;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert);

  const handleChange = (data) => (e) => {
    setValues({ ...values, [data]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    dispatch(register(values));
  };
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div class="form-check pb-3">
        <input
          onClick={() => setValues({ ...values, role: 1 })}
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label">Click if you want to be Admin</label>
      </div>
      <button onClick={(e) => clickSubmit(e)} className="btn btn-primary ">
        Submit
      </button>
    </form>
  );

  if (isAuthenticated && !loading) {
    if (user && user.role === 1) {
      return <Redirect to="/admin" />;
    } else if (user && user.role === 0) {
      return <Redirect to="/user" />;
    }
  }

  return (
    <Layout
      title="signup"
      description="signup page"
      className="container col-md-8 offset-md-2"
    >
      {alerts &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg}
          </div>
        ))}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
