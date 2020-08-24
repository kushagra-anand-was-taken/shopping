import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { addproduct } from "../../action/product";
import { addcategories } from "../../action/category";

const AddProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const alerts = useSelector((state) => state.alert);
  const allcategory = useSelector((state) => state.category.categories);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",

    createdProduct: "",

    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    createdProduct,

    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    dispatch(addcategories());
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(addproduct(formData));
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handlePhoto = (name) => (event) => {
    // console.log(event.target.files);
    const value = event.target.files[0];
    // console.log(value);
    formData.set(name, value);
    setValues({ ...values, [name]: value });

    const data = new FormData();
    // console.log(photo);
    data.append("file", value);
    data.append("upload_preset", "shopping");
    data.append("cloud_name", "dbsrz3obq");
    // console.log(data);
    fetch("https://api.cloudinary.com/v1_1/dbsrz3obq/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.url);
        formData.set("photo", data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newProductForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handlePhoto("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

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
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {allcategory &&
            allcategory.map((cat, i) => (
              <option key={i} value={cat._id}>
                {cat.name}
              </option>
            ))}
          {/* <option value={"5f1e7d9c06bf001a6c2e5bb7"}>node</option>
          <option value={"5f1e7d9c06bf001a6c2e5bb7"}>vrfv</option> */}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user && user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {alerts &&
            alerts.map((alert) => (
              <div key={alert.id} className={` alert alert-${alert.type}`}>
                {alert.msg}
              </div>
            ))}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
