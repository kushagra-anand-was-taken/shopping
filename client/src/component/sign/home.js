import React from "react";
import Layout from "../layout/layout";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <Layout title="HOME" description="Home page">
      ...
    </Layout>
  );
};

export default Home;
