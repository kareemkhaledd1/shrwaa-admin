const express = require("express");
const {
  updateBrand,
  deleteBrand,
  getBrands,
  newBrand, getBrand,
} = require("../controllers/brand.controller");
const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrand);
router.post("/", newBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
