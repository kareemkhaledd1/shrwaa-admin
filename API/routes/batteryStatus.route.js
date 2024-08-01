const router = require("express").Router();

const {
  getBatteryStatus,
  newBatteryStatus,
} = require("../controllers/batteryStatus.controller");

router.get("/", getBatteryStatus);
router.post("/", newBatteryStatus);

module.exports = router;
