import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/layout";
import { getCart, emptyCart } from "./cartHelpers";
import Card from "../layout/Card";
import { useDispatch, useSelector } from "react-redux";
import { cartorder } from "../../action/order";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert);
  const name = useSelector((state) => state.auth.user?.name);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const Handleorder = () => {
    const data = {
      products: items,
      transaction_id: getRandomInt(10000),
      amount: items.reduce((acc, cur) => acc + cur.count * cur.price, 0),
      address,
    };
    dispatch(cartorder(data));
    emptyCart();
    setRun(!run);
    setAddress("");
  };

  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  async function handleToken(token) {
    const data = {
      products: items,
      transaction_id: getRandomInt(10000),
      amount: items.reduce((acc, cur) => acc + cur.count * cur.price, 0),
      address,
    };
    const response = await axios.post("/checkout", { token, data });
    const { status } = response.data;

    if (status === "success") {
      dispatch(cartorder(data));
      emptyCart();
      setRun(!run);
    }
  }

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <h2>
            YOUR CART TOTAL RS.{"  "}
            {items.reduce((acc, cur) => acc + cur.count * cur.price, 0)}
          </h2>

          {alerts &&
            alerts.map((alert) => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                {alert.msg}
              </div>
            ))}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div id="cod" className="pt-5 mb-5">
              <label className="switch ">
                <input onClick={() => toggleHandler()} type="checkbox" />
                <span className="slider round"></span>
              </label>
              <h4 className="pl-5">CASH ON DELIVERY</h4>
            </div>
            <StripeCheckout
              stripeKey="pk_test_51Hly6dGagzp60v4FVdviZ65ityloEBZD6Kfdsaa4YB7F8YQ1JojH5QlaafU31A4IFYz0maiJWmDWDYuJN9swh5wG00HjEDVFt8"
              token={handleToken}
              currency="INR"
              amount={
                items.reduce((acc, cur) => acc + cur.count * cur.price, 0) * 100
              }
              name={`${name}'s Bill`}
              billingAddress
              shippingAddress
            />
          </div>

          {toggle && (
            <>
              <div className="pt-5 mb-3">
                <label className="text-muted">Delivery address:</label>
                <textarea
                  onChange={(e) => handleAddress(e)}
                  className="form-control"
                  value={address}
                  placeholder="Type your delivery address here..."
                />
              </div>
              <button
                onClick={() => Handleorder()}
                className="btn btn-success btn-block"
              >
                Order
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
