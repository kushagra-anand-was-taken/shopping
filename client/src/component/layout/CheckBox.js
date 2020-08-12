import React, { useState } from "react";

const CheckBox = ({ categories, handleFilter }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(id);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(id);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    handleFilter(newCheckedCategoryId, "category");
    setChecked(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={() => handleToggle(c._id)}
        // value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default CheckBox;
