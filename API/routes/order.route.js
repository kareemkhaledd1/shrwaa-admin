const route = require("express").Router();

const {
  getAllOrders,
  aggregateOrders,
  getOrders,
  getOrder,
  newOrder,
  verifyUser,
} = require("../controllers/order.controller");

route.get("/all-orders", getAllOrders);
route.get("/aggregate-orders", aggregateOrders);
route.get("/", getOrders);
route.get("/:id", getOrder);
route.post("/", newOrder);
route.post("/verifyOtp", verifyUser);

module.exports = route;
