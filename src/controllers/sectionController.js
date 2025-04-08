const Section = require("../models/section");
const Company = require("../models/company");

exports.createSection = async (req, res) => {
  try {
    const { companyId, titleAr, titleEn, order } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const section = new Section({ titleAr, titleEn, order, company: companyId });
    await section.save();

    company.sections.push(section._id);
    await company.save();

    res.status(201).json({ message: "Section created successfully", section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { titleAr, titleEn } = req.body;

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { titleAr, titleEn },
      { new: true, runValidators: true }
    );

    if (!section) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section updated successfully", section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    await Company.updateMany({}, { $pull: { sections: sectionId } });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
