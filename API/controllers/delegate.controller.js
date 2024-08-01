const { Delegate } = require("../models/delegate");
const { PhoneStatus } = require("../models/phoneStatus");
const { BatteryStatus } = require("../models/batterystatus");

const getDelegateNotes = async (req, res) => {
  try {
    const delegate = await Delegate.find()
      .populate("phoneStatus")
      .populate("batteryStatus");
    res.status(200).json(delegate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDelegateNote = async (req, res) => {
  try {
    const delegate = await Delegate.findById(req.params.id);
    if (!delegate) {
      return res.status(404).send({ message: "Delegate not found" });
    }
    res.status(200).json(delegate);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createDelegateNote = async (req, res) => {
  const {
    delegateName,
    finalPrice,
    cardImage,
    phoneImage,
    delegateNote,
    phoneStatus: phoneStatusId,
    batteryStatus: batteryStatusId,
  } = req.body;
  const phoneStatus = await PhoneStatus.findById(phoneStatusId);
  const batteryStatus = await BatteryStatus.findById(batteryStatusId);
  try {
    const newDelegate = new Delegate({
      delegateName,
      finalPrice,
      cardImage,
      phoneImage,
      delegateNote,
      phoneStatus: phoneStatus,
      batteryStatus: batteryStatus,
    });
    await newDelegate.save();
    res.status(201).json(newDelegate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDelegateNotes,
  getDelegateNote,
  createDelegateNote,
};
