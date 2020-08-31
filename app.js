const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/products", require("./routes/products"));
app.use("/api/order", require("./routes/order"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
