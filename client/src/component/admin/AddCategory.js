import React, { useState } from "react";
import Layout from "../layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { addcategory } from "../../action/category";

const AddCategory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const alerts = useSelector((state) => state.alert);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    dispatch(addcategory({ name }));
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user && user.name}, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {alerts &&
            alerts.map((alert) => (
              <div key={alert.id} className={` alert alert-${alert.type}`}>
                {alert.msg}
              </div>
            ))}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
