const express = require("express");
const router = express.Router();
const { Order, CartItem } = require("../models/order");
const auth = require("../middleware/auth");
const addtouser = require("../middleware/addtouser");
const updatequantity = require("../middleware/updatequantity");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    auth,
    addtouser,
    updatequantity,
    check("address", "address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      if (req.body) {
        const order = new Order(req.body);
        order.user = req.user.id;
        await order.save();
        res.json(order);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

router.get("/list", auth, async (req, res) => {
  try {
    const list = await Order.find({ user: req.user.id })
      .populate("user", "_id name address")
      .sort("-created");
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(401).send("server error");
  }
});

// router.get("/status", async (req, res) => {
//   res.json(Order.schema.path("status").enumValues);
// });

router.put("/update/:id", async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    order.status = req.body.status;
    order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(401).send("server error");
  }
});

module.exports = router;
