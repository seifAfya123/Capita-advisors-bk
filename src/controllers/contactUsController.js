const ContactUs = require("../models/contactUs");

exports.sendContactRequest = async (req, res) => {
  try {
    const { name, email, phone, country, service } = req.body;
    const contactRequest = new ContactUs({
      name,
      email,
      phone,
      country,
      service: service || "Normal Request", 
    });

    await contactRequest.save();
    res.status(201).json({ message: "Contact request sent successfully", contactRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContactRequests = async (req, res) => {
  try {
    const { service, date, stared } = req.query;
    let filter = {};

    if (service) filter.service = service;
    if (date) filter.date = { $gte: new Date(date).setHours(0, 0, 0), $lt: new Date(date).setHours(23, 59, 59) };
    if (stared !== undefined) filter.stared = stared === "true";

    const contactRequests = await ContactUs.find(filter);
    res.status(200).json(contactRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleStarredStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const contactRequest = await ContactUs.findById(requestId);

    if (!contactRequest) return res.status(404).json({ message: "Contact request not found" });

    contactRequest.stared = !contactRequest.stared;
    await contactRequest.save();

    res.status(200).json({ message: "Request status updated", stared: contactRequest.stared });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
