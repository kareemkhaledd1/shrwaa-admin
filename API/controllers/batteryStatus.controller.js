const { BatteryStatus } = require("../models/batterystatus");

const getBatteryStatus = async (req, res) => {
  try {
    const batteryStatus = await BatteryStatus.find();
    res.status(200).json(batteryStatus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get batteryStatus", error: error.message });
  }
};

const newBatteryStatus = async (req, res) => {
  const { title } = req.body;
  try {
    const createBatteryStatus = new BatteryStatus({
      title,
    });
    await createBatteryStatus.save();
    res.status(201).json(createBatteryStatus);
  } catch (error) {
    res.status(500).json({ message: "Failed to create batteryStatus" });
  }
};

module.exports = {
  getBatteryStatus,
  newBatteryStatus,
};
