const { Brand } = require("../models/brand");
const mongoose = require("mongoose");
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

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get brands" });
  }
};

const getBrands = async (req, res) => {
  try {
    const filter = req.query.filter;

    const page = parseInt(req.query.page) || 1;
    const pageSize =
      filter !== "all" ? null : parseInt(req.query.pageSize) || 8;
    const skip = (page - 1) * pageSize;

    let filterCondition = {};
    if (filter === "available") {
      filterCondition = { available: true };
    } else if (filter === "not-available") {
      filterCondition = { available: false };
    } else if (filter === "published") {
      filterCondition = { published: true };
    } else if (filter === "not-published") {
      filterCondition = { published: false };
    }

    const totalCount = await Brand.countDocuments(filterCondition);
    const brands = await Brand.find(filterCondition, { __v: false })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ brands, totalCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get brands" });
  }
};
const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id, { __v: false });
    res.status(200).json(brand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get brand" });
  }
};

const newBrand = async (req, res) => {
  const { name, published } = req.body;
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/images/`;

  try {
    const newBrand = new Brand({
      name,
      published,
      image: `${basePath}${fileName}`,
    });
    await newBrand.save();
    res.status(200).json(newBrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create brand" });
  }
};

const updateBrand = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid brand Id");

  const { name, published } = req.body;

  const brand = await Brand.findById(req.params.id);
  if (!brand) return res.status(400).send("Brand not found");

  const file = req.file;
  let imagePath = brand.image;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
    imagePath = `${basePath}${fileName}`;
  }

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name,
        published,
        image: imagePath,
      },
      { new: true },
    );

    res.status(200).json(updatedBrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update brands" });
  }
};

const deleteBrand = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid brand Id");

  const { id } = req.params;

  try {
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete brands" });
  }
};

module.exports = {
  getBrands,
  getBrand,
  newBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  upload,
};
