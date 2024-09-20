const route = require("express").Router();
const {
  delegateOrder,
  getDelegateOrders,
} = require("../controllers/delegate.controller");
const { verifyToken } = require("../middleware/verifyToken");

route.post("/create", verifyToken, delegateOrder);
route.get("/delegate-order", verifyToken, getDelegateOrders);

module.exports = route;
