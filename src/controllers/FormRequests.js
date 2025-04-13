const ContactUs = require("../models/contactUs");
const validator = require("../validations/contactValidation");

exports.sendContactRequest = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, phone, country, formanswer, formid } = req.body;
    const contactRequest = new ContactUs({
      name,
      email,
      phone,
      country,
      formanswer,
      formid,
    });

    await contactRequest.save();
    res
      .status(201)
      .json({ message: "Contact request sent successfully", contactRequest });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};

exports.getContactRequests = async (req, res) => {
  try {
    const { service, date, stared, country ,search} = req.query;
    let filter = {};

    if (country) filter.country = country.toLowerCase();
    if (service) filter.service = service.toLowerCase();
    if (search) filter.search = search.toLowerCase();
    if (date)
      filter.date = {
        $gte: new Date(date).setHours(0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59),
      };
    if (stared !== undefined) filter.stared = stared === "true";

    const contactRequests = await ContactUs.find(filter).sort({ date: -1 });
    res.status(200).json(contactRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleStarredStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contactRequest = await ContactUs.findById(id);

    if (!contactRequest)
      return res.status(404).json({ message: "form answer is not found" });

    contactRequest.stared = !contactRequest.stared;
    await contactRequest.save();

    res.status(200).json({
      message: "Request status updated",
      stared: contactRequest.stared,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
