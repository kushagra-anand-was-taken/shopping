const User = require("../models/User");
module.exports = function (req, res, next) {
  try {
    let history = [];

    req.body.products.forEach((item) => {
      history.push({
        _id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.count,
        transaction_id: req.body.transaction_id,
        amount: req.body.amount,
      });
    });

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { history: history } },
      { new: true },
      (error, data) => {
        if (error) {
          return res.status(400).json({
            error: "Could not update user purchase history",
          });
        }
        next();
      }
    );
  } catch (err) {
    console.error("Product not added to user history");
    res.status(500).json({ msg: "Server Error" });
  }
};
