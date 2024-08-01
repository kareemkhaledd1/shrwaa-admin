const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  title_en: {
    type: String,
  },
  specifications_en: [
    {
      type: String,
    },
  ],
  title_ar: {
    type: String,
  },
  specifications_ar: [
    {
      type: String,
    },
  ],
});

statusSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

statusSchema.set("toJSON", {
  virtuals: true,
});

exports.Status = mongoose.model("Status", statusSchema);
