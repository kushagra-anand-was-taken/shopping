import React, { useEffect } from "react";
import Layout from "../layout/layout";
import { single_product, related_product } from "../../action/product";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../component/layout/Card";

const Singleproduct = (props) => {
  const item = useSelector((state) => state.product);
  const { loading, product, related_products } = item;

  const dispatch = useDispatch();
  const id = props.match.params.productid;
  useEffect(() => {
    const id = props.match.params.productid;
    dispatch(related_product(id));
    dispatch(single_product(id));
  }, [props]);
  return (
    <Layout
      title="Product"
      description="Product description"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {!loading && <Card product={product} showViewProductButton={false} />}
        </div>
        <div className="col-4">
          {!loading &&
            related_products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Singleproduct;
