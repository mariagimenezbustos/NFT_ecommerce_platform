const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const proRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const stripeRouter = require("./routes/stripe");
const sendgridRouter = require("./routes/sendgrid");
const brandsRouter = require("./routes/brands");

const app = express();

app.use(logger("dev"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/api/index", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", proRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/sendgrid", sendgridRouter);
app.use("/api/auth", authRouter);
app.use("/api/brands", brandsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

module.exports = app;
