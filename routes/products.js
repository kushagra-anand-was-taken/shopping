const express = require("express");
const router = express.Router();
const loadproduct = require("../middleware/loadproduct");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const products = await Product.find()

      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit);

    res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: "Products not found",
    });
  }
});

router.get("/related", loadproduct, async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const relproduct = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })

      .limit(limit)
      .populate("category", "_id name");
    res.json(relproduct);
  } catch (error) {
    return res.status(400).json({
      error: "Products not found",
    });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    return res.status(400).json({
      error: "Categories not found",
    });
  }
});

router.post("/by/search", async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  try {
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          // gte -  greater than price [0-10]
          // lte - less than
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    const product = await Product.find(findArgs)

      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);
    res.json({
      size: product.length,
      product,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Products not found",
    });
  }
});

router.get("/photo", loadproduct, (req, res) => {
  if (req.product.photo) {
    // res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo);
  }
});

router.get("/search", (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    });
  }
});

module.exports = router;
