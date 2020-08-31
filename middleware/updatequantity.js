const Product = require("../models/Product");
module.exports = function (req, res, next) {
  try {
    let bulkOps = req.body.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update product",
        });
      }
      next();
    });
  } catch (err) {
    console.error("Product count not updated");
    res.status(500).json({ msg: "Server Error" });
  }
};
