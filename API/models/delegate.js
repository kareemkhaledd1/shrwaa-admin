const mongoose = require("mongoose");

const delegateSchema = new mongoose.Schema({
  delegateName: {
    type: String,
    required: true,
  },
  cardImages: [
    {
      type: String,
    },
  ],
  phoneImages: [
    {
      type: String,
    },
  ],
  finalPrice: {
    type: String,
    required: true,
  },
  batteryStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BatteryStatus",
  },
  phoneStatus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhoneStatus",
    },
  ],
  delegateNote: {
    type: String,
  },
});

delegateSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

delegateSchema.set("toJSON", {
  virtuals: true,
});

exports.Delegate = mongoose.model("Delegate", delegateSchema);
