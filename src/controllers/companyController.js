const Company = require("../models/companyReg");

exports.createCompany = async (req, res) => {
  try {
    const { name, image } = req.body;
    const company = new Company({ name, image, status: true });
    await company.save();
    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}, "name image status");
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

    company.status = !company.status;
    await company.save();
    
    res.status(200).json({ message: "Company status updated", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
