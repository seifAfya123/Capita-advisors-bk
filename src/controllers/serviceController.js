const Service = require("../models/service");

exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().select("name_en name_ar image brief_ar brief_en");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceDetails = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId).select("name_en name_ar brief_ar brief_en image desc_en desc_ar");

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ________ clinet __________
exports.clientgetServiceDetails = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId).select("name_en name_ar brief_ar brief_en image desc_en desc_ar");

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
