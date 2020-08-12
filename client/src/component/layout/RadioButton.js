import React, { useState } from "react";

const RadioButton = ({ prices, handleFilter }) => {
  //   const [value, setvalue] = useState(0);
  const handleToggle = (e) => {
    // console.log(e.target.value);
    // setvalue(e.target.value);
    handleFilter(e.target.value, "price");
  };
  return prices.map((p) => (
    <li key={p._id} className="list-unstyled">
      <input
        onChange={(e) => handleToggle(e)}
        value={p._id}
        type="radio"
        name={p}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </li>
  ));
};

export default RadioButton;
