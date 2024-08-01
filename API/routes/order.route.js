const route = require("express").Router();

const {
  getOrders,
  getOrder,
  newOrder,
  verifyUser,
} = require("../controllers/order.controller");

route.get("/", getOrders);
route.get("/:id", getOrder);
route.post("/", newOrder);
route.post("/verifyOtp", verifyUser);

module.exports = route;
