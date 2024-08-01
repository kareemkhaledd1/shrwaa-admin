const { Brand } = require("../models/brand");
const mongoose = require("mongoose");

const getBrands = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;
    const skip = (page - 1) * pageSize;

    const filter = req.query.filter || "all";

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
  const { name, image, available, published } = req.body;
  try {
    const newBrand = new Brand({
      name,
      image,
      available,
      published,
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

  const { name, image, available, published } = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        available,
        published,
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
};
