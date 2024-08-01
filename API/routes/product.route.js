const express = require('express')
const {getProducts, newProduct, getSingleProduct, updateProduct, removeProduct} = require("../controllers/product.controller");

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.post('/', newProduct)
router.put('/:id', updateProduct)
router.delete('/:id', removeProduct)

module.exports = router