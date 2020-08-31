const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

router.post(
  "/signup",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "length should be greater than 6").isLength({ min: 6 }),
    check("password")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, name, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: " User already exist" }] });
      }

      user = new User({ name, email, password, role });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSecret,
        { expiresIn: 654654 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

router.post(
  "/signin",
  [
    check("email", "Please include an email").isEmail(),
    check(
      "password",
      "please enter password with length greater than 6"
    ).exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: " invalid credentials" }] });
      }

      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSecret,
        { expiresIn: 654654 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);

router.put("/update", auth, async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (name) {
      user.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    console.log("USER UPDATE ERROR", error);
    return res.status(400).json({
      error: "User update failed",
    });
  }
});

module.exports = router;
