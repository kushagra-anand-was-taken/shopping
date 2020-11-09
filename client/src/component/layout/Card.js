import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
// import ShowImage from "../../component/layout/ShowImage";
import { addItem, updateItem, removeItem } from "../miscellaneous/cartHelpers";

const Card = ({
  product,
  showViewProductButton,
  showAddToCartButton,
  showRemoveProductButton,
  cartUpdate,
  setRun,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product?.count);

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showViewButton = (showViewProductButton = true) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showAddToCartBtn = (showAddToCartButton = true) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const showCartUpdateOptions = (cartUpdate = false) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton = false) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product?.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}

        <div className="product-img">
          <img
            src={product?.photo}
            alt={product?.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>

        <p className="card-p  mt-2">
          {product?.description.substring(0, 100)}{" "}
        </p>
        <p className="card-p black-10">$ {product?.price}</p>
        <p className="black-9">Category: {product?.category.name}</p>
        <p className="black-8">
          Added on {moment(product?.createdAt).fromNow()}
        </p>
        {showStock(product?.quantity)}
        <br />

        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
