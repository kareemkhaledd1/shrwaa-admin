const { PhoneStatus } = require("../models/phoneStatus");
const getPhoneStatus = async (req, res) => {
  try {
    const phoneStatus = await PhoneStatus.find();
    res.status(200).json(phoneStatus);
  } catch (error) {
    res.status(500).json({ message: "Failed to get phoneStatus" });
  }
};

const newPhoneStatus = async (req, res) => {
  const { title } = req.body;

  try {
    const createPhoneStatus = new PhoneStatus({
      title,
    });
    await createPhoneStatus.save();
    res.status(201).json(createPhoneStatus);
  } catch (error) {
    res.status(500).json({ message: "Failed to create phoneStatus" });
  }
};

module.exports = {
  getPhoneStatus,
  newPhoneStatus,
};
