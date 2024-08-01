const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: [
      "http://localhost:3003",
      "http://localhost:4000",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(cookieParser());

const brandRoutes = require("./routes/brand.route.js");
app.use("/brand", brandRoutes);

const productRoutes = require("./routes/product.route");
app.use("/product", productRoutes);

const statusRoutes = require("./routes/status.route");
app.use("/status", statusRoutes);

const authRoutes = require("./routes/auth.route");
app.use("/auth", authRoutes);

const orderRoute = require("./routes/order.route");
app.use("/order", orderRoute);

const batteryStatusRoutes = require("./routes/batteryStatus.route");
app.use("/batteryStatus", batteryStatusRoutes);

const phoneStatusRoutes = require("./routes/phoneStatus.route");
app.use("/phoneStatus", phoneStatusRoutes);

const delegateRoute = require("./routes/delegate.route");
app.use("/delegate", delegateRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(4000, () => {
  console.log("Server listening on port: 4000");
});
