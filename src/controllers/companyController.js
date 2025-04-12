const Company = require("../models/companyReg");

exports.createCompany = async (req, res) => {
  try {
    const { name, image } = req.body;
    const company = new Company({ name, image, status: true });
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      console.log(existingCompany);
      res.status(400).json({ message: "Country already exist" });
    }
    await company.save();
    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const existingCompany = await Company.findByIdAndDelete(companyId);
    if (!existingCompany) {
      return res.status(400).json({ message: "Country doesnt exist" });
    }
    res.status(201).json({ message: "Company Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}, "name image isActive");
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.clientgetAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find(
      { isActive: true },
      "name image isActive"
    );
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeCompanyStatus = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) return res.status(404).json({ message: "Company not found" });

    company.isActive = !company.isActive;

    await company.save();

    res.status(200).json({ message: "Company status updated", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCompanyDetails = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);

    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
