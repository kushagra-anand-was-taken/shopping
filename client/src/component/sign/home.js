import React, { useEffect } from "react";
import Layout from "../layout/layout";
import { Productbysell } from "../../action/product";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../component/layout/Card";
import Search from "../layout/Search";
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(Productbysell("sold"));
  }, []);
  return (
    <Layout title="HOME" description="Home page" className="container-fluid">
      <Search />
      <h2 className="mb-4">New Arrival</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-4 mb-3">
            <Card keys={product._id} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
