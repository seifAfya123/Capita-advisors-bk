const mongose = require("mongoose");
const contactUsSchema = mongose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    stared: { type: Boolean, required: true, default: false },
    service: { type: String, default: "Normal Request" },
    date: { type: Date, default: Date.now },
  },
  {
    Timestamp: true,
  }
);

module.exports = mongose.model("ContactUs", contactUsSchema);
