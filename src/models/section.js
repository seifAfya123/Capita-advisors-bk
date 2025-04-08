const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    order: { type: Number, required: true }, // Rank/priority of section
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // One-to-Many Relationship
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", sectionSchema);


