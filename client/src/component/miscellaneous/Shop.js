import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import CheckBox from "../layout/CheckBox";
import RadioButton from "../layout/RadioButton";
import { addcategories } from "../../action/category";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../component/layout/Card";
import { prices } from "./fixedPrices";

const Shop = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  useEffect(() => {
    dispatch(addcategories());
  }, []);
  const handleprice = (filters) => {
    const data = prices;
    let array = [];
    for (let i in data) {
      if (data[i]._id === parseInt(filters)) {
        array = data[i].array;
      }
    }
    return array;
  };

  const handleFilter = (filters, filterBy) => {
    // console.log("shop", filters, filterBy);
    const newfilters = { ...myFilters };

    newfilters.filters[filterBy] = filters;
    setMyFilters(newfilters);
    if ((filterBy = "price")) {
      let pricevalue = handleprice(filters);
      newfilters.filters[filterBy] = pricevalue;
    }
  };
  return (
    <Layout
      title="Shopping page"
      description="Select from categories and buy all you want"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <div className="ml-5">
            <CheckBox
              categories={categories}
              handleFilter={(filters, filterBy) =>
                handleFilter(filters, filterBy)
              }
            />
          </div>
          <h4>Filter by Price</h4>
          <RadioButton
            prices={prices}
            handleFilter={(filters, filterBy) =>
              handleFilter(filters, filterBy)
            }
          />
        </div>
        <div className="col-8 ">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
