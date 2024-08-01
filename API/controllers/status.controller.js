const { Status } = require("../models/status");
const mongoose = require("mongoose");

const getStatus = async (req, res) => {
  try {
    const status = await Status.find();
    res.status(200).json(status);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get status" });
  }
};

const newStatus = async (req, res) => {
  const { title_en, specifications_en, title_ar, specifications_ar } = req.body;
  try {
    const createStatus = new Status({
      title_en,
      specifications_en,
      title_ar,
      specifications_ar,
    });
    await createStatus.save();

    res.status(201).json(createStatus);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add status" });
  }
};

const updateStatus = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid status Id");

  const { title_en, specifications_en, title_ar, specifications_ar } = req.body;
  const { id } = req.params;
  try {
    const updatedStatus = await Status.findByIdAndUpdate(
      id,
      {
        title_en,
        specifications_en,
        title_ar,
        specifications_ar,
      },
      { new: true },
    );
    res.status(201).json(updatedStatus);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

const deleteStatus = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid status Id");

  const { id } = req.params;

  try {
    await Status.findByIdAndDelete(id);
    res.status(200).json({ message: "Status deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete status" });
  }
};

module.exports = {
  getStatus,
  newStatus,
  updateStatus,
  deleteStatus,
};
