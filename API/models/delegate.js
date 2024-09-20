const mongoose = require("mongoose");

const delegateSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  delegateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

delegateSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

delegateSchema.set("toJSON", {
  virtuals: true,
});

exports.Delegate = mongoose.model("Delegate", delegateSchema);
