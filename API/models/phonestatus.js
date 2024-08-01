const mongoose = require("mongoose");

const phoneStatusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
});

phoneStatusSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

phoneStatusSchema.set("toJSON", {
  virtuals: true,
});

exports.PhoneStatus = mongoose.model("PhoneStatus", phoneStatusSchema);
