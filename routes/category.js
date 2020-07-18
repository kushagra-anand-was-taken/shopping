const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Category = require("../models/Category");

router.post(
  "/create",
  [auth, check("name", "name is required").not().isEmpty()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      let category = await Category.findOne({ name: req.body.name });
      if (category) {
        return res
          .status(400)
          .json({ error: [{ msg: " Category already exist" }] });
      }

      category = new Category({ user: req.user.id, name: req.body.name });
      await category.save();
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
