import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addcategories } from "../../action/category";

const Search = () => {
  const [inp, setinp] = useState({ category: "", search: "" });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const { category, search } = inp;
  useEffect(() => {
    dispatch(addcategories());
  }, []);

  const handleChange = (name) => (e) => {
    setinp({ ...inp, [name]: e.target.value });
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    console.log(inp);
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
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">
        {/* {searchedProducts(results)} */}
      </div>
    </div>
  );
};

export default Search;
