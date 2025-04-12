const ContactUs = require("../models/contactUs");
const validator = require("../validations/contactValidation");

exports.sendContactRequest = async (req, res) => {
  // const { error, value } = validator.contactRequestSchema.validate(req.body, {
  //   abortEarly: false,
  // });

  // if (error) {
  //   const errors = error.details.map((detail) => ({
  //     field: detail.path[0],
  //     message: detail.message,
  //   }));
  //   return res.status(400).json({ errors });
  // }

  try {
    console.log(req.body);
    
    const { name, email, phone, country, service } = req.body;
    // country=country.toLowerCase()
    // service=service.toLowerCase()
    // email=email.toLowerCase()
    // name=name.toLowerCase()
    const contactRequest = new ContactUs({
      name,
      email,
      phone,
      country,
      service: service || "Normal Request",
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
    const { service, date, stared, country } = req.query;
    let filter = {};

    if (country) filter.country = country.toLowerCase();
    if (service) filter.service = service.toLowerCase();
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
    const { requestId } = req.params;
    const contactRequest = await ContactUs.findById(requestId);

    if (!contactRequest)
      return res.status(404).json({ message: "Contact request not found" });

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
