const express = require("express");
const {
  updateBrand,
  deleteBrand,
  getBrands,
  newBrand,
  getBrand,
  getAllBrands,
  upload,
} = require("../controllers/brand.controller");
const router = express.Router();

router.get("/", getBrands);
router.get("/", getAllBrands);
router.get("/:id", getBrand);
router.post("/", upload.single("image"), newBrand);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
