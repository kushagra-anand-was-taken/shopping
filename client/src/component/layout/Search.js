import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addcategories } from "../../action/category";
import { dynamicproduct } from "../../action/product";

import Card from "./Card";

const Search = () => {
  const [inp, setinp] = useState({ category: "", search: "" });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const dynpro = useSelector((state) => state.filtered_product);
  const { searched_products, search_loading } = dynpro;
  const { category, search } = inp;

  useEffect(() => {
    dispatch(addcategories());
    dispatch(dynamicproduct(inp));
  }, []);
  let msg = "";
  const showmsg = () => {
    if (!search_loading && searched_products.length > 0) {
      msg = (
        <h2 className="ml-3 mb-4">{`${searched_products.length} product found`}</h2>
      );
    }
    if (!search_loading && searched_products.length < 1) {
      msg = <h2 className="ml-3 mb-4">No Product found</h2>;
    }
  };
  const Show = () => {
    return (
      <div className="row">
        {!search_loading &&
          searched_products.map((product) => (
            <div key={product._id} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
      </div>
    );
  };

  const handleChange = (name) => (e) => {
    setinp({ ...inp, [name]: e.target.value });
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    dispatch(dynamicproduct(inp));
  };
  const searchForm = () => (
    <form onSubmit={(e) => searchSubmit(e)}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
            value={search}
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text" onClick={showmsg()}>
            Search
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div>{msg}</div>

      <div className="container-fluid mb-3">{Show()}</div>
    </div>
  );
};

export default Search;
