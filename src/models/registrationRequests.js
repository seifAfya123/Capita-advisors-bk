const mongoose = require("mongoose");

const registrationRequestsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    companyType: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Auto timestamp
    registrationFile: { type: String, required: true }, // Assuming a file URL or path
    stared: { type: Boolean, required: true, default: false },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true, 
    }, // Linked to Company model
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model(
  "RegistrationRequest",
  registrationRequestsSchema
);
