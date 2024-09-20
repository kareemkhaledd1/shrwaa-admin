const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "delegate"],
    default: "admin",
  },
  avatar: {
    type: String,
  },
});

authSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

authSchema.set("toJSON", {
  virtuals: true,
});

exports.Admin = mongoose.model("Admin", authSchema);
