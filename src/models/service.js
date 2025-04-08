const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name_ar: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    name_en: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    brief_ar: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 300,
    },
    brief_en: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 300,
    },
    desc_ar: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    desc_en: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    is_active: {
      type: Boolean,
      default: false, // Default value set
    },
    image: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\/.+/, // Validates if it's a URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
