const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const loadproduct = require("../middleware/loadproduct");
const Product = require("../models/Product");

router.post("/create", auth, (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    // console.log(fields);
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      photo,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !photo ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);
    product.user = req.user.id;

    // 1kb = 1000
    // 1mb = 1000000

    // if (files.photo) {
    //   // console.log("FILES PHOTO: ", files.photo);
    //   if (files.photo.size > 1000000) {
    //     return res.status(400).json({
    //       error: "Image should be less than 1mb in size",
    //     });
    //   }
    //   product.photo.data = fs.readFileSync(files.photo.path);
    //   product.photo.contentType = files.photo.type;
    // }

    product.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
});

router.get("/:productid", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productid).select(
      "-photo"
    );
    // product.photo = undefined;
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("product not found");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await product.remove();

    res.json({ msg: "product removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.put("/update", [auth, loadproduct], async (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // console.log(fields, files);
    // const id = req.params.productid;
    // let product = Product.findByIdAndUpdate(id, fields, {
    //   new: true,
    //   upsert: true,
    // });
    // let product = Product.findById(req.params.productid);
    let product = req.product;
    // console.log(product);

    product = _.extend(product, fields);
    // console.log(product);
    // console.log(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
});

module.exports = router;
