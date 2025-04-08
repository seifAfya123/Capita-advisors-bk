const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },  // English title
      ar: { type: String, required: true },  // Arabic title
    },
    description: {
      en: { type: String, required: true },  // English description
      ar: { type: String, required: true },  // Arabic description
    },
    brief: {
      en: { type: String, required: true },  // English brief
      ar: { type: String, required: true },  // Arabic brief
    },
    image: {
      type: String,  // URL or path to image
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
