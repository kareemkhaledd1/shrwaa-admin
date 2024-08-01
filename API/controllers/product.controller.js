const { Product } = require("../models/product");
const mongoose = require("mongoose");
const { Brand } = require("../models/brand");

const getProducts = async (req, res) => {
  let filter = {};
  if (req.query.brand) {
    filter = { brand: req.query.brand.split(",") };
  }
  try {
    const products = await Product.find(filter, { __v: false }).populate(
      "brand",
    );
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get products" });
  }
};

const getSingleProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid brand Id");

  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("brand");
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Product" });
  }
};

const newProduct = async (req, res) => {
  const { name, img, goodPrice, fairPrice } = req.body;
  const brand = await Brand.findById(req.body.brand);
  try {
    const createProduct = new Product({
      name,
      img,
      goodPrice,
      fairPrice,
      brand: brand,
    });
    await createProduct.save();
    res.status(201).json(createProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid brand Id");

  const { name, img, goodPrice, fairPrice } = req.body;
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        img,
        goodPrice,
        fairPrice,
      },
      { new: true },
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

const removeProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid brand Id");
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  removeProduct,
};
