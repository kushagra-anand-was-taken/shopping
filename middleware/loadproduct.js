const Product = require("../models/Product");

module.exports = function (req, res, next) {
  const id = req.header("productid");

  if (!id) {
    return res.status(401).json({ msg: "No id, enter id to update" });
  }
  try {
    const product = Product.findById(id);
    req.product = product;
    next();
  } catch (error) {
    console.log(error);
    console.error("something wrong with loadproduct middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
