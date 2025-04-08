const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionAr: { type: String, required: true, trim: true },
    questionEn: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true, default: "text" }, // Input type: text, radio, etc.
    order: { type: Number, required: true }, // Rank/priority of question
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    }, // Many-to-One Relationship
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
