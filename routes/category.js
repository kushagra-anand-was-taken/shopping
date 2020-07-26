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

router.get("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(401).send("category does not exists");
  }
});

router.put("/update/:id", auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    category.name = req.body.name;
    category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(401).send("sserver error");
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    // Check user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await category.remove();

    res.json({ msg: "product removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Category.find({});
    res.json(list);
  } catch (error) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
