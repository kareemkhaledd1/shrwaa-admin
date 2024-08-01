const mongoose = require("mongoose");

const batteryStatusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
});

batteryStatusSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

batteryStatusSchema.set("toJSON", {
  virtuals: true,
});

exports.BatteryStatus = mongoose.model("BatteryStatus", batteryStatusSchema);
