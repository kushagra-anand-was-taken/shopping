import React from "react";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  const auth = useSelector((state) => state.auth);
  const { loading, isAuthenticated, user } = auth;
  return (
    <div>
      <Navbar />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
