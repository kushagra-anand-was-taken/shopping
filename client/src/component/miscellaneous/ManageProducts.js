import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import Axios from "axios";
import { Link } from "react-router-dom";
// import { Productbysell } from "../../action/product";
// import { useDispatch, useSelector } from "react-redux";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [run, setrun] = useState(true);
  const getallproducts = async () => {
    const res = await Axios.get("/api/products?limit=undefined");
    const products = res.data;
    setProducts(products);
  };
  useEffect(() => {
    getallproducts();
  }, [run]);

  const destroy = async (id) => {
    await Axios({
      method: "delete",
      url: `/api/product/${id}`,
      headers: {
        "x-auth-token": localStorage.token,
      },
    });
    setrun(!run);
  };

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
