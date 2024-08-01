const router = require("express").Router();

const {
  getPhoneStatus,
  newPhoneStatus,
} = require("../controllers/phoneStatus.controller");

router.get("/", getPhoneStatus);
router.post("/", newPhoneStatus);

module.exports = router;
