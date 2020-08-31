import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { listorder, liststatus } from "../../action/order";
import moment from "moment";

const Adminorder = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.orders);
  //   const statusValues = useSelector((state) => state.orders.status);
  const [run, setrun] = useState(true);
  const statusValues = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  useEffect(() => {
    dispatch(listorder());
    // dispatch(liststatus());
  }, [run]);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const handleStatusChange = (e, id) => {
    const status = e.target.value;
    return fetch(`/api/order/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        setrun(!run);
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        <select
          className="form-control"
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <Layout
      title="Order List"
      description={`G'day ${user && user.name}, You can see all the orders `}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}

          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {o._id}</span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${o.amount}</li>
                  <li className="list-group-item">Ordered by: {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{
                      padding: "20px",
                      border: "1px solid indigo",
                    }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product total", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Adminorder;
