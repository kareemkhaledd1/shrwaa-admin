const { Product } = require("../models/product");
const mongoose = require("mongoose");
const { Brand } = require("../models/brand");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");

    cb(null, `${Date.now()}-${fileName}`);
  },
});

const upload = multer({ storage });

const getProducts = async (req, res) => {
  let filter = {};
  if (req.query.brand) {
    filter = { brand: req.query.brand.split(",") };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const search = req.query.search || "";

  if (search) {
    filter.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  try {
    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter, { __v: false })
      .populate("brand")
      .skip(skip)
      .limit(limit);

    res.status(200).json({ products, totalCount });
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
  const { name, goodPrice, fairPrice } = req.body;
  const brand = await Brand.findById(req.body.brand);
  if (!brand) return res.status(400).send("Invalid Brand");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/images/`;

  try {
    const createProduct = new Product({
      name,
      img: `${basePath}${fileName}`,
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

  const { name, goodPrice, fairPrice } = req.body;
  const { id } = req.params;
  const file = req.file;

  const product = await Product.findById(id);
  if (!product) return res.status(400).send("Invalid Product");

  let imagePath = product.image;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
    imagePath = `${basePath}${fileName}`;
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        img: imagePath,
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
  upload,
};
