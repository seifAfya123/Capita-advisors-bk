const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      trim: true,
      match: /^https?:\/\/(www\.)?facebook\.com\/.+$/, // Ensures it's a Facebook link
    },
    instagram: {
      type: String,
      trim: true,
      match: /^https?:\/\/(www\.)?instagram\.com\/.+$/, // Ensures it's an Instagram link
    },
    tiktok: {
      type: String,
      trim: true,
      match: /^https?:\/\/(www\.)?tiktok\.com\/.+$/, // Ensures it's a TikTok link
    },
    twitter: {
      type: String,
      trim: true,
      match: /^https?:\/\/(www\.)?twitter\.com\/.+$/, // Ensures it's a Twitter link
    },
    linkedin: {
      type: String,
      trim: true,
      match: /^https?:\/\/(www\.)?linkedin\.com\/.+$/, // Ensures it's a LinkedIn link
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Validates proper email format
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+?\d{7,15}$/, // Allows numbers with country code (7-15 digits)
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    locationDescription: {
      type: String,
      trim: true,
    },

    locationMapLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metadata", metadataSchema);
