const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

brandSchema.set("toJSON", {
  virtuals: true,
});

exports.Brand = mongoose.model("Brand", brandSchema);
