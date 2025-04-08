const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // Store image URL
    isActive: { type: Boolean, default: true }, // Active (true) or Inactive (false)
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }], // One-to-Many Relationship
    registrationRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "RegistrationRequest" },
    ], // One-to-Many Relationship
  },
  { timestamps: true } // Auto add createdAt & updatedAt
);

module.exports = mongoose.model("Company", companySchema);


// company {name, image, status(true = active), sections[]}
// sections {titleAr, titleEn, order, company}