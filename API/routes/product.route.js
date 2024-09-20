const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  removeProduct,
  upload,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", upload.single("image"), newProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", removeProduct);

module.exports = router;
